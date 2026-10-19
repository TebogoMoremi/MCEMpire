import { SiteHeader } from "@/components/site-header";
import { photographyServices } from "@/services/photography";
import { site } from "@/lib/site";
import { PortfolioGallery } from "@/components/portfolio-gallery";
import { ContactSection, Packages } from "@/components/packages";
import { HeroSlider } from "@/components/hero-slider";
import { CameraLens } from "@/components/camera-lens";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <HeroSlider />
        <CameraLens />
        <PortfolioGallery />
        <section id="services" className="services" aria-labelledby="services-title">
          <div className="section-heading"><p className="eyebrow">02 / Our focus</p><h2 id="services-title">Every story deserves<br />a second look.</h2></div>
          <div className="service-grid">{photographyServices.map((service, index) => <article key={service.slug}><span className="service-number">0{index + 1}</span><h3>{service.title}</h3><p>{service.description}</p></article>)}</div>
        </section>
        <Packages />
        <ContactSection />
      </main>
      <footer><p>{site.name}</p><span>Made for moments that matter.</span></footer>
    </>
  );
}
