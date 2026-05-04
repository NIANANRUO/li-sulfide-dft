"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  ["首页", "/"],
  ["锂硫基础", "/fundamentals"],
  ["关键问题", "/challenges"],
  ["催化剂体系", "/catalyst-systems"],
  ["证据链方法库", "/experiments"],
  ["DFT/VASP", "/dft-screening"],
  ["电化学性能", "/performance"]
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-700/40 bg-ink/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded bg-cyan/15 text-sm font-bold text-cyan soft-border">
            LiS
          </span>
          <span className="hidden text-sm font-semibold text-slate-100 sm:block">DFT Li-S Catalyst Lab</span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map(([label, href]) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`rounded px-3 py-2 text-sm transition ${
                  active ? "bg-cyan/12 text-cyan" : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <button
          aria-label="打开导航"
          className="grid h-9 w-9 place-items-center rounded soft-border lg:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {open && (
        <nav className="grid gap-1 border-t border-slate-700/40 bg-ink px-4 py-3 lg:hidden">
          {navItems.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="rounded px-3 py-2 text-sm text-slate-200 hover:bg-white/5"
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-slate-700/40 px-4 py-8 text-center text-sm text-slate-400">
      <p>DFT 指导下的锂硫电池催化剂筛选与机制研究 · mock data 可替换科研展示网站</p>
    </footer>
  );
}
