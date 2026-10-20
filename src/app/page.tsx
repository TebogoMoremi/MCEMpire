import { SiteHeader } from "@/components/site-header";
import { photographyServices } from "@/services/photography";
import Image from "next/image";
import { AboutStudio, BookingBanner, SiteFooter } from "@/components/studio-sections";
import { PortfolioGallery } from "@/components/portfolio-gallery";
import { ContactSection, Packages } from "@/components/packages";
import { HeroSlider } from "@/components/hero-slider";
import { CameraLens } from "@/components/camera-lens";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("M.E.C Empire | Professional Photography & Videography", "Photography, videography and canvas printing for weddings, portraits, matric dances and life's meaningful occasions. Explore M.E.C Empire's work and packages.", "/");

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
          <div className="service-grid">{photographyServices.map((service, index) => <article key={service.slug}><div className={`service-image ${service.image.startsWith("offers/") ? "brochure-image" : ""}`}><Image src={`/images/${service.image}.jpeg`} alt="" fill sizes="(max-width:600px) 88vw, (max-width:1000px) 42vw, 28vw" /></div><span className="service-number">0{index + 1}</span><h3>{service.title}</h3><p>{service.description}</p><a className="text-link" href={service.href}>Explore {service.title.toLowerCase()} ↗</a></article>)}</div>
        </section>
        <Packages />
        <AboutStudio />
        <BookingBanner />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
