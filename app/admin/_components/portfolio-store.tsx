"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Portfolio } from "@/db/types";
import {
  createPortfolioProject,
  deletePortfolioProject,
  getAllPortfolioForAdmin,
  updatePortfolioProject,
} from "@/db/actions/portfolio";

interface PortfolioStore {
  portfolios: Portfolio[];
  ready: boolean;
  addPortfolio: (p: Portfolio) => Promise<Portfolio>;
  updatePortfolio: (p: Portfolio) => Promise<void>;
  deletePortfolio: (id: string) => Promise<void>;
  getPortfolio: (id: string) => Portfolio | undefined;
}

const PortfolioContext = createContext<PortfolioStore | null>(null);

function toPortfolio(row: Awaited<ReturnType<typeof getAllPortfolioForAdmin>>[number]): Portfolio {
  return {
    id: row.id,
    title: row.title,
    location: row.location,
    region: row.region as Portfolio["region"],
    service: row.service as Portfolio["service"],
    depth: row.depth ?? "",
    yieldRate: row.yieldRate ?? "",
    duration: row.duration ?? "",
    year: row.year ?? "",
    img: row.img,
    gallery: row.gallery ?? [],
    isVideo: row.isVideo ?? false,
    summary: row.summary,
    status: row.status,
    featured: row.featured,
    createdAt: row.createdAt.toISOString(),
  };
}

function toPortfolioInput(portfolio: Portfolio) {
  return {
    title: portfolio.title,
    location: portfolio.location,
    region: portfolio.region,
    service: portfolio.service,
    depth: portfolio.depth,
    yieldRate: portfolio.yieldRate,
    duration: portfolio.duration,
    year: portfolio.year,
    img: portfolio.img,
    gallery: portfolio.gallery ?? [],
    isVideo: portfolio.isVideo ?? false,
    summary: portfolio.summary,
    status: portfolio.status,
    featured: portfolio.featured,
  };
}

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    getAllPortfolioForAdmin()
      .then((rows) => {
        if (active) setPortfolios(rows.map(toPortfolio));
      })
      .finally(() => {
        if (active) setReady(true);
      });
    return () => {
      active = false;
    };
  }, []);

  async function addPortfolio(p: Portfolio) {
    const result = await createPortfolioProject(toPortfolioInput(p));
    if (!result.success || !result.data?.id) throw new Error(result.message);
    const saved = { ...p, id: result.data.id };
    setPortfolios((prev) => [saved, ...prev]);
    return saved;
  }

  async function updatePortfolio(p: Portfolio) {
    const result = await updatePortfolioProject(p.id, toPortfolioInput(p));
    if (!result.success) throw new Error(result.message);
    setPortfolios((prev) => prev.map((item) => (item.id === p.id ? p : item)));
  }

  async function deletePortfolio(id: string) {
    const result = await deletePortfolioProject(id);
    if (!result.success) throw new Error(result.message);
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
