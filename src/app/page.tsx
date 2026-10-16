import { SiteHeader } from "@/components/site-header";
import { photographyServices } from "@/services/photography";
import { site } from "@/lib/site";
import Image from "next/image";
import { PortfolioGallery } from "@/components/portfolio-gallery";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <p className="eyebrow">M.E.C Empire Photography / A new perspective</p>
          <h1 id="hero-title">Life moves.<br /><em>Keep the feeling.</em></h1>
          <div className="hero-bottom"><p>Portraits, celebrations and family stories.<br />Thoughtfully seen. Beautifully remembered.</p><a className="button" href="#portfolio">Explore the portfolio <span aria-hidden="true">↘</span></a></div>
          <figure className="hero-photograph"><Image src="/images/portfolio/sunset-portrait.jpeg" alt="A smiling woman in an orange patterned dress and white shawl, photographed against the evening sky" width={1022} height={1280} sizes="(max-width: 800px) 80vw, 32vw" preload /><figcaption>THE LAST LIGHT / M.E.C EMPIRE</figcaption></figure>
        </section>
        <PortfolioGallery />
        <section id="services" className="services" aria-labelledby="services-title">
          <div className="section-heading"><p className="eyebrow">02 / Our focus</p><h2 id="services-title">Every story deserves<br />a second look.</h2></div>
          <div className="service-grid">{photographyServices.map((service, index) => <article key={service.slug}><span className="service-number">0{index + 1}</span><h3>{service.title}</h3><p>{service.description}</p></article>)}</div>
        </section>
        <section className="launch-note"><p className="eyebrow">More to come</p><h2>Your next chapter, captured.</h2><p>Explore our work above. Online booking is in development; session availability and enquiries will be added soon.</p></section>
      </main>
      <footer><p>{site.name}</p><span>Made for moments that matter.</span></footer>
    </>
  );
}
