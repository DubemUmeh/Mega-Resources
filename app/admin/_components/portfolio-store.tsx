"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Portfolio } from "@/db/types";
import { portfolioData } from "@/db/portfolio";

const STORAGE_KEY = "admin-portfolio-data";

interface PortfolioStore {
  portfolios: Portfolio[];
  ready: boolean;
  addPortfolio: (p: Portfolio) => void;
  updatePortfolio: (p: Portfolio) => void;
  deletePortfolio: (id: string) => void;
  getPortfolio: (id: string) => Portfolio | undefined;
}

const PortfolioContext = createContext<PortfolioStore | null>(null);

/**
 * Demo-grade persistence so the dedicated /admin/portfolio/add and
 * /admin/portfolio/[id]/edit routes can share state with the list page
 * across full navigations. Swap the localStorage read/write below for
 * real API calls (e.g. fetch to your backend) when one exists.
 */
export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [portfolios, setPortfolios] = useState<Portfolio[]>(portfolioData);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setPortfolios(JSON.parse(raw));
    } catch {
      // ignore malformed/absent storage, fall back to seed data
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolios));
  }, [portfolios, ready]);

  function addPortfolio(p: Portfolio) {
    setPortfolios((prev) => [p, ...prev]);
  }

  function updatePortfolio(p: Portfolio) {
    setPortfolios((prev) => prev.map((item) => (item.id === p.id ? p : item)));
  }

  function deletePortfolio(id: string) {
    setPortfolios((prev) => prev.filter((item) => item.id !== id));
  }

  function getPortfolio(id: string) {
    return portfolios.find((item) => item.id === id);
  }

  return (
    <PortfolioContext.Provider
      value={{ portfolios, ready, addPortfolio, updatePortfolio, deletePortfolio, getPortfolio }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolioStore() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error("usePortfolioStore must be used within a PortfolioProvider");
  return ctx;
}