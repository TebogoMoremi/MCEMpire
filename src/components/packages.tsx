import Image from "next/image";
import { contact, enquiryLink, formatPrice, packages } from "@/services/packages";

export function Packages() {
  return (
    <section id="packages" className="packages" aria-labelledby="packages-title">
      <div className="section-heading">
        <div><p className="eyebrow">03 / Something for every chapter</p><h2 id="packages-title">Your story.<br /><em>Your way.</em></h2></div>
        <p className="section-intro">Explore our photography, film and canvas offers. Prices are in South African rand, as shown in our brochures. Confirm availability and final details with the studio.</p>
      </div>
      <nav className="package-jump-links" aria-label="Browse packages">{packages.map((item) => <a key={item.id} href={`#${item.id}`}>{item.label} <span aria-hidden="true">↗</span></a>)}</nav>
      {packages.map((item, index) => (
        <article className={`package-story package-story-${item.id}`} id={item.id} key={item.id}>
          <div className="package-art">
            <a href={`/images/offers/${item.image}.jpeg`} target="_blank" rel="noopener noreferrer" aria-label={`View full ${item.label} brochure (opens in a new tab)`}>
              <Image src={`/images/offers/${item.image}.jpeg`} alt={item.alt} width={item.width} height={item.height} sizes="(max-width: 800px) 88vw, 38vw" />
            </a>
            <p className="image-note">View the full brochure ↗</p>
          </div>
          <div className="package-copy">
            <p className="eyebrow">0{index + 1} / {item.label}</p><h3>{item.title}</h3><p>{item.description}</p>
            <dl className="price-list">{item.options.map((option) => <div key={option.name}><dt>{option.name}<span>{option.detail}</span></dt><dd>{formatPrice(option.price)}</dd></div>)}</dl>
            <p className="package-note">{item.note}</p>
            <a className="button" href={enquiryLink(item.label)} target="_blank" rel="noopener noreferrer">Enquire on WhatsApp <span aria-hidden="true">↗</span></a>
          </div>
        </article>
      ))}
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-title">
      <div className="contact-copy">
        <p className="eyebrow">04 / Be the next shoot</p>
        <h2 id="contact-title">Let’s make<br /><em>something memorable.</em></h2>
        <p>Tell us about your occasion, preferred date and the package you have in mind. We’ll take it from there.</p>
        <div className="contact-actions"><a className="button" href={enquiryLink()} target="_blank" rel="noopener noreferrer">WhatsApp {contact.whatsapp} ↗</a><a className="phone-link" href={contact.phoneHref}>Call {contact.phone} ↗</a></div>
        <p className="booking-note">A deposit secures your booking. Without a deposit, your enquiry stays on the waiting list. Contact the studio for payment details and confirmation; an enquiry does not reserve a date.</p>
      </div>
      <a className="booking-poster" href="/images/offers/booking-guide.jpeg" target="_blank" rel="noopener noreferrer" aria-label="View studio booking guide (opens in a new tab)"><Image src="/images/offers/booking-guide.jpeg" width={1280} height={720} sizes="(max-width: 800px) 88vw, 42vw" alt="M.E.C Empire photographer and studio booking guide: a deposit secures a booking, and payment is required for work" /></a>
    </section>
  );
}
