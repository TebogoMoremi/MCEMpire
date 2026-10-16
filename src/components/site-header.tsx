import { site } from "@/lib/site";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label={site.name}>M.E.C <span>EMPIRE / PHOTOGRAPHY</span></Link>
      <nav aria-label="Main navigation"><a href="#portfolio">Portfolio</a><a href="#services">Our focus <span aria-hidden="true">↗</span></a></nav>
    </header>
  );
}
