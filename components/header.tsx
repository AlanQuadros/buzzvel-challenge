"use client";

import { useEffect, useRef, useState } from "react";
import { ActionButton } from "./experience";

const links = [
  { href: "#courses", label: "Courses" },
  { href: "#contact", label: "For Teams" },
  { href: "#community", label: "Community" },
  { href: "#how-it-works", label: "About" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const controller = new AbortController();
    document.addEventListener(
      "keydown",
      (event) => {
        if (event.key === "Escape") {
          setOpen(false);
          toggleRef.current?.focus();
        }
      },
      { signal: controller.signal },
    );
    document.addEventListener(
      "pointerdown",
      (event) => {
        if (!menuRef.current?.contains(event.target as Node)) setOpen(false);
      },
      { signal: controller.signal },
    );
    const query = window.matchMedia("(min-width: 768px)");
    query.addEventListener("change", () => setOpen(false), {
      signal: controller.signal,
    });
    return () => controller.abort();
  }, [open]);

  return (
    <header ref={menuRef} className="site-header">
      <div className="page-container header-inner">
        <a
          href="#top"
          aria-label="Luma home"
          className="wordmark"
          onClick={() => setOpen(false)}
        >
          luma.
        </a>
        <nav
          aria-label="Main navigation"
          className="desktop-navigation hidden md:flex"
        >
          {links.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="header-actions hidden md:flex">
          <ActionButton action={{ kind: "login" }} className="login-link">
            Log in
          </ActionButton>
          <ActionButton
            action={{ kind: "join" }}
            className="button button-primary"
          >
            Start learning
          </ActionButton>
        </div>
        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle md:hidden"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span
            className={open ? "hamburger is-open" : "hamburger"}
            aria-hidden="true"
          >
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="mobile-navigation md:hidden"
        >
          {links.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <div onClick={() => setOpen(false)}>
            <ActionButton action={{ kind: "login" }} className="login-link">
              Log in
            </ActionButton>
            <ActionButton
              action={{ kind: "join" }}
              className="button button-primary"
            >
              Start learning
            </ActionButton>
          </div>
        </nav>
      )}
    </header>
  );
}
