import Image from "next/image";
import Link from "next/link";
import { contact, enquiryLink } from "@/services/packages";
export function BookingBanner() {
  return <section className="booking-banner" aria-labelledby="booking-title"><Image src="/images/portfolio/couple-at-dusk.jpeg" alt="" fill sizes="100vw" /><div><p className="eyebrow">Be the next shoot</p><h2 id="booking-title">Let’s capture<br /><em>your story.</em></h2><p>Whether you’re celebrating a milestone, planning a wedding, or creating lasting memories, M.E.C Empire is ready to capture your moment.</p><div className="hero-actions"><a className="button" href={enquiryLink()} target="_blank" rel="noopener noreferrer">Book your session ↗</a><Link className="button button-outline" href="/#packages">Explore packages</Link></div></div></section>;
}
export function AboutStudio() {
  return <section className="about-studio" aria-labelledby="about-title"><a href="/images/offers/booking-guide.jpeg" target="_blank" rel="noopener noreferrer" aria-label="View the photographer and original booking guide"><Image src="/images/offers/booking-guide.jpeg" alt="M.E.C Empire photographer holding a camera, pictured on the original studio booking guide" width={1280} height={720} sizes="(max-width:800px) 88vw, 45vw" /></a><div><p className="eyebrow">M.E.C Empire</p><h2 id="about-title">Behind<br /><em>the lens.</em></h2><p>Every session begins with your story. Share the occasion, the people and the details that matter to you, and discuss how you want to remember them.</p><Link className="text-link" href="/contact">Let’s talk about your vision ↗</Link></div></section>;
}
export function SiteFooter() {
  return <footer className="studio-footer"><div><Link className="wordmark" href="/">M.E.C <span>EMPIRE / PHOTOGRAPHY</span></Link><p>Made for moments that matter.</p></div><nav aria-label="Footer navigation"><Link href="/#portfolio">Our work</Link><Link href="/#services">Services</Link><Link href="/#packages">Packages</Link><Link href="/contact">Contact & enquiries</Link></nav><div><a href={enquiryLink()} target="_blank" rel="noopener noreferrer">WhatsApp {contact.whatsapp} ↗</a><a href={contact.phoneHref}>Call {contact.phone} ↗</a></div></footer>;
}

