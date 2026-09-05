#!/usr/bin/env python3
"""Marketing screenshot capture for the Pro-Drive Fasteners site.

Usage:
    python3 scripts/capture-screenshots.py <viewport-key|social>

Viewport keys: mobile-390, mobile-430, tablet-768, laptop-1440, desktop-1920, social
Output: public/screenshots/<key>/*.png  (deviceScaleFactor 2)
"""
import asyncio
import os
import sys

from playwright.async_api import async_playwright

BASE = "http://localhost:8080"
OUT_ROOT = "public/screenshots"

ROUTES = [
    ("home", "/"),
    ("about", "/about"),
    ("products", "/products"),
    ("staples", "/staples"),
    ("l-cleats", "/l-cleats"),
    ("divergent-staples", "/divergent-staples"),
    ("brads-finish-nails", "/brads-finish-nails"),
    ("mallets", "/mallets"),
    ("split-head-hammer-faces", "/split-head-hammer-faces"),
    ("tapping-rings", "/tapping-rings"),
    ("tapping-blocks", "/tapping-blocks"),
    ("tipper-de-tipper", "/tipper-de-tipper"),
    ("air-tools", "/air-tools"),
    ("accessories", "/accessories"),
    ("videos", "/videos"),
    ("contact", "/contact"),
]

VIEWPORTS = {
    "mobile-390": (390, 844),
    "mobile-430": (430, 932),
    "tablet-768": (768, 1024),
    "laptop-1440": (1440, 900),
    "desktop-1920": (1920, 1080),
}

SOCIAL = {
    "og-1200x630": (1200, 630),
    "square-1080x1080": (1080, 1080),
    "story-1080x1920": (1080, 1920),
}

HIDE_CSS = """
  *::-webkit-scrollbar { width: 0 !important; height: 0 !important; }
  html { scrollbar-width: none !important; }
  .pd-text-toggle { display: none !important; }
  [data-radix-toast-viewport], [data-sonner-toaster] { display: none !important; }
"""


async def prep(page):
    await page.add_style_tag(content=HIDE_CSS)
    try:
        await page.evaluate("document.fonts && document.fonts.ready")
    except Exception:
        pass
    # let every <img> finish
    try:
        await page.wait_for_function(
            "Array.from(document.images).every(i => i.complete)", timeout=15000
        )
    except Exception:
        pass
    # dismiss any overlay/popup if present
    for sel in ['button[aria-label="Close"]', 'button[aria-label="Dismiss"]']:
        try:
            btn = page.locator(sel).first
            if await btn.count() and await btn.is_visible():
                await btn.click()
        except Exception:
            pass
    try:
        await page.keyboard.press("Escape")
    except Exception:
        pass
    await page.wait_for_timeout(1500)


async def capture_route(page, out_dir, name, path):
    await page.goto(BASE + path, wait_until="domcontentloaded")
    await prep(page)
    await page.evaluate("window.scrollTo(0,0)")
    await page.wait_for_timeout(400)
    await page.screenshot(path=f"{out_dir}/{name}--hero.png")
    await page.screenshot(path=f"{out_dir}/{name}--full-page.png", full_page=True)

    # section crops
    await page.evaluate("window.scrollTo(0,0)")
    boxes = await page.evaluate(
        """() => Array.from(document.querySelectorAll('main > div > section, main > div > header, footer'))
              .map(el => { const r = el.getBoundingClientRect();
                return { y: r.top + window.scrollY, h: r.height }; })
              .filter(b => b.h > 120)"""
    )
    for i, b in enumerate(boxes[:8], start=1):
        await page.evaluate(f"window.scrollTo(0, {int(b['y'])})")
        await page.wait_for_timeout(1500)
        await page.screenshot(path=f"{out_dir}/{name}--section-{i:02d}.png")


async def main():
    key = sys.argv[1]
    out_dir = f"{OUT_ROOT}/{key}"
    os.makedirs(out_dir, exist_ok=True)

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        if key == "social":
            for label, (w, h) in SOCIAL.items():
                ctx = await browser.new_context(
                    viewport={"width": w, "height": h}, device_scale_factor=2
                )
                page = await ctx.new_page()
                page.set_default_timeout(120000)
                await page.goto(BASE + "/", wait_until="domcontentloaded")
                await prep(page)
                await page.screenshot(path=f"{out_dir}/{label}.png")
                await ctx.close()
        else:
            w, h = VIEWPORTS[key]
            ctx = await browser.new_context(
                viewport={"width": w, "height": h}, device_scale_factor=2
            )
            page = await ctx.new_page()
            page.set_default_timeout(120000)
            for name, path in ROUTES:
                await capture_route(page, out_dir, name, path)
                print("done", key, name, flush=True)
            await ctx.close()
        await browser.close()


asyncio.run(main())
