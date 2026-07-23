// Runtime DOM walker that shrinks every ® to a proper superscript mark.
// Runs after hydration in the browser only; wraps ® in <sup class="pd-reg">
// so it reads as a mark rather than a same-size character.
//
// Skips: <script>, <style>, <head>, and any element marked [data-no-reg].
// Idempotent: skips text nodes whose parent is already .pd-reg.
import { useEffect } from "react";

const REG = "\u00AE";
const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "CODE", "PRE"]);

function shouldSkip(node: Node): boolean {
  let el: Node | null = node;
  while (el && el.nodeType === 1) {
    const e = el as Element;
    if (SKIP_TAGS.has(e.tagName)) return true;
    if (e.hasAttribute?.("data-no-reg")) return true;
    if (e.classList?.contains("pd-reg")) return true;
    el = e.parentNode;
  }
  return false;
}

function process(root: Node) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue?.includes(REG)) return NodeFilter.FILTER_REJECT;
      if (shouldSkip(node.parentNode as Node)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  const targets: Text[] = [];
  let n: Node | null;
  while ((n = walker.nextNode())) targets.push(n as Text);

  for (const textNode of targets) {
    const parts = textNode.nodeValue!.split(REG);
    const frag = document.createDocumentFragment();
    for (let i = 0; i < parts.length; i++) {
      if (parts[i]) frag.appendChild(document.createTextNode(parts[i]));
      if (i < parts.length - 1) {
        const sup = document.createElement("sup");
        sup.className = "pd-reg";
        sup.textContent = REG;
        frag.appendChild(sup);
      }
    }
    textNode.parentNode?.replaceChild(frag, textNode);
  }
}

export function useShrinkRegistered() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    process(document.body);
    const obs = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of Array.from(m.addedNodes)) {
          if (node.nodeType === 1 || node.nodeType === 3) process(node);
        }
      }
    });
    obs.observe(document.body, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, []);
}
