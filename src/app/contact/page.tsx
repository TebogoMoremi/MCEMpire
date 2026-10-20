import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/studio-sections";
import { contact, enquiryLink } from "@/services/packages";
import { faqs } from "@/services/faq";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Contact M.E.C Empire | Photography Bookings & Enquiries", "Tell M.E.C Empire about your wedding, portrait session or special occasion. Get in touch for photography bookings, packages and enquiries.", "/contact");

export default function ContactPage() {
  return <><SiteHeader /><main id="main">
    <section className="contact-hero" aria-labelledby="contact-page-title">
      <Image src="/images/portfolio/roses-studio.jpeg" alt="Studio portrait with a bouquet of red roses" fill sizes="100vw" preload />
      <div><p className="eyebrow">A conversation is where it begins</p><h1 id="contact-page-title">Let’s create<br /><em>something memorable.</em></h1><p>Have a special event coming up? Tell us about your vision, and let’s bring your photography ideas to life.</p></div>
    </section>
    <section className="contact-content" aria-labelledby="contact-options-title">
      <div className="section-heading"><div><p className="eyebrow">Your story starts here</p><h2 id="contact-options-title">Let’s talk.</h2></div><p className="section-intro">Share the date, occasion and details that matter to you. We’ll discuss availability and the right package together.</p></div>
      <div className="contact-cards"><a href={enquiryLink()} target="_blank" rel="noopener noreferrer"><span className="contact-icon" aria-hidden="true">☏</span><h3>WhatsApp</h3><p>{contact.whatsapp}</p><span>Start a conversation ↗</span></a><a href={contact.phoneHref}><span className="contact-icon" aria-hidden="true">☎</span><h3>Phone</h3><p>{contact.phone}</p><span>Call the studio ↗</span></a></div>
      <div id="enquiry" className="enquiry-panel"><p className="eyebrow">Photography enquiries</p><h2>Tell us what<br /><em>you have in mind.</em></h2><p>Include your preferred date, location and photography service when you contact us.</p><a className="button" href={enquiryLink()} target="_blank" rel="noopener noreferrer">Enquire on WhatsApp ↗</a></div>
    </section>
    <section className="quick-contact"><p className="eyebrow">Need a quick response?</p><h2>A little hello.<br /><em>A world of possibilities.</em></h2><p>Chat with M.E.C Empire directly on WhatsApp for photography enquiries and bookings.</p><a className="button" href={enquiryLink()} target="_blank" rel="noopener noreferrer">Continue on WhatsApp ↗</a></section>
    <section className="contact-faq" aria-labelledby="faq-title"><p className="eyebrow">Before your session</p><h2 id="faq-title">A few helpful answers.</h2>{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</section>
  </main><SiteFooter /></>;
}
