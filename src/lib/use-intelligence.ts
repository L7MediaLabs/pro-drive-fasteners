import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { getLatestIntelligence } from "@/lib/intelligence.functions";
import { mockIntelligence } from "@/data/mockIntelligence";
import type { WeeklyIntelligenceData, WeeklyIntelligenceRow } from "@/lib/intelligence-types";

const KEY = "pd-intel-mode";
export type IntelMode = "DEMO" | "LIVE";

export function useIntelMode() {
  const [mode, setModeState] = useState<IntelMode>("DEMO");
  useEffect(() => {
    const v = sessionStorage.getItem(KEY);
    if (v === "DEMO" || v === "LIVE") setModeState(v);
  }, []);
  const setMode = (m: IntelMode) => {
    sessionStorage.setItem(KEY, m);
    setModeState(m);
    window.dispatchEvent(new Event("pd-intel-mode-change"));
  };
  useEffect(() => {
    const h = () => {
      const v = sessionStorage.getItem(KEY);
      if (v === "DEMO" || v === "LIVE") setModeState(v);
    };
    window.addEventListener("pd-intel-mode-change", h);
    return () => window.removeEventListener("pd-intel-mode-change", h);
  }, []);
  return { mode, setMode };
}

export function useIntelligence() {
  const { mode } = useIntelMode();
  const getLatest = useServerFn(getLatestIntelligence);
  const liveQ = useQuery({
    queryKey: ["intel-latest", mode],
    queryFn: () => getLatest(),
    enabled: mode === "LIVE",
  });

  if (mode === "DEMO") {
    const row: WeeklyIntelligenceRow = {
      id: "demo",
      week_of: mockIntelligence.weekOf,
      uploaded_by: null,
      uploaded_at: mockIntelligence.processedAt,
      data: mockIntelligence,
    };
    return { mode, row, data: mockIntelligence as WeeklyIntelligenceData, loading: false, error: null };
  }
  return {
    mode,
    row: liveQ.data ?? null,
    data: (liveQ.data?.data ?? null) as WeeklyIntelligenceData | null,
    loading: liveQ.isLoading,
    error: liveQ.error,
  };
}
