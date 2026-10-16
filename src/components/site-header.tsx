import { site } from "@/lib/site";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label={site.name}>M.E.C <span>EMPIRE / PHOTOGRAPHY</span></Link>
      <nav aria-label="Main navigation"><a href="#portfolio">Our work</a><a href="#packages">Packages</a><a className="nav-contact" href="#contact">Let’s talk ↗</a></nav>
    </header>
  );
}
