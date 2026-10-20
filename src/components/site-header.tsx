"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";
import { useMediaQuery } from "@/lib/use-media-query";
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const mobile = useMediaQuery("(max-width: 700px)", false);
  return <header className="site-header" onKeyDown={(event) => { if (event.key === "Escape") { setOpen(false); button.current?.focus(); } }}>
    <Link className="wordmark" href="/" aria-label={site.name}>M.E.C <span>EMPIRE / PHOTOGRAPHY</span></Link>
    <button ref={button} className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"} <span aria-hidden="true">{open ? "−" : "+"}</span></button>
    <nav id="main-navigation" className={open ? "is-open" : ""} aria-label="Main navigation" inert={mobile && !open} onClick={() => setOpen(false)}><Link href="/#portfolio">Our work</Link><Link href="/#services">Services</Link><Link href="/#packages">Packages</Link><Link className="nav-contact" href="/contact">Let’s talk ↗</Link></nav>
  </header>;
}
