import { SiteHeader } from "@/components/site-header";
import { photographyServices } from "@/services/photography";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <p className="eyebrow">M.E.C Empire Photography / A new perspective</p>
          <h1 id="hero-title">Life moves.<br /><em>Keep the feeling.</em></h1>
          <div className="hero-bottom"><p>Portraits, celebrations and brand stories.<br />Thoughtfully seen. Beautifully remembered.</p><a className="button" href="#services">Explore our focus <span aria-hidden="true">↘</span></a></div>
          <div className="frame-art" aria-hidden="true"><span>M.E.C</span><small>LIGHT / FORM / FEELING</small></div>
        </section>
        <section id="services" className="services" aria-labelledby="services-title">
          <div className="section-heading"><p className="eyebrow">01 / Our focus</p><h2 id="services-title">Every story deserves<br />a second look.</h2></div>
          <div className="service-grid">{photographyServices.map((service, index) => <article key={service.slug}><span className="service-number">0{index + 1}</span><h3>{service.title}</h3><p>{service.description}</p></article>)}</div>
        </section>
        <section className="launch-note"><p className="eyebrow">In development</p><h2>A new home for your stories.</h2><p>Our portfolio and booking experience are on their way. Check back soon to see our work.</p></section>
      </main>
      <footer><p>{site.name}</p><span>Made for moments that matter.</span></footer>
    </>
  );
}
