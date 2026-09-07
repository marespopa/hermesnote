"use client";

import React, { useCallback, useEffect } from "react";
import { useAtom } from "jotai";
import { atom_sidebarWidth } from "@/app/atoms/atoms";
import { atom_isSidebarResizing } from "@/app/atoms/ui-atoms";

export const MIN_SIDEBAR_WIDTH = 200;

export function useSidebarResize() {
  const [sidebarWidth, setSidebarWidth] = useAtom(atom_sidebarWidth);
  const [isResizing, setIsResizing] = useAtom(atom_isSidebarResizing);

  const startResizing = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    setIsResizing(true);
  }, [setIsResizing]);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, [setIsResizing]);

  const resize = useCallback((event: MouseEvent) => {
    if (!isResizing) return;
    setSidebarWidth(Math.max(MIN_SIDEBAR_WIDTH, Math.min(600, event.clientX)));
  }, [isResizing, setSidebarWidth]);

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  useEffect(() => {
    if (sidebarWidth < MIN_SIDEBAR_WIDTH) {
      setSidebarWidth(MIN_SIDEBAR_WIDTH);
    }
  }, [sidebarWidth, setSidebarWidth]);

  return { sidebarWidth, isResizing, startResizing };
}
