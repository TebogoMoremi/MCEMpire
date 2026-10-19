"use client";

import Image from "next/image";
import { useCarousel } from "@/lib/use-carousel";
import { heroSlides } from "@/services/hero";
import { enquiryLink } from "@/services/packages";

export function HeroSlider() {
  const carousel = useCarousel(heroSlides.length, true);
  const slide = heroSlides[carousel.index];
  return (
    <section id="home" className="cinema-hero" aria-label="Photography highlights" aria-roledescription="carousel" {...carousel.bindings}>
      <div className="hero-picture" key={slide.image}>
        <Image src={`/images/portfolio/${slide.image}.jpeg`} alt={slide.alt} fill sizes="(max-width: 800px) 100vw, 65vw" preload={carousel.index === 0} loading={carousel.index === 0 ? undefined : "eager"} style={{ objectPosition: slide.position }} />
      </div>
      <div className="cinema-content" aria-live={carousel.paused ? "polite" : "off"} aria-atomic="true">
        <p className="eyebrow">M.E.C Empire / {slide.category}</p>
        <h1 key={slide.title}>{slide.title}<br /><em>{slide.accent}</em></h1>
        <p className="hero-description">Photography that holds a feeling.<br />Stories that stay with you.</p>
        <div className="hero-actions"><a className="button" href={slide.href}>{slide.cta} <span aria-hidden="true">↗</span></a><a className="text-link" href={enquiryLink()} target="_blank" rel="noopener noreferrer">Book your session ↗</a></div>
      </div>
      <div className="hero-navigation">
        <span className="slide-number" aria-hidden="true">0{carousel.index + 1}<span> / 0{heroSlides.length}</span></span>
        <div className="slide-dots" aria-label="Choose a slide">{heroSlides.map((item, index) => <button key={item.image} type="button" aria-label={`Show slide ${index + 1}: ${item.category}`} aria-pressed={carousel.index === index} onClick={() => carousel.go(index)} />)}</div>
        <div className="carousel-controls">
          <button type="button" aria-label="Previous slide" onClick={carousel.previous}>←</button>
          <button type="button" aria-label="Next slide" onClick={carousel.next}>→</button>
          {!carousel.reduced && <button className="rotation-toggle" type="button" onClick={() => carousel.setPaused(!carousel.paused)} aria-label={carousel.paused ? "Resume slideshow" : "Pause slideshow"}>{carousel.paused ? "Play" : "Pause"}</button>}
        </div>
      </div>
      <a className="scroll-cue" href="#portfolio">Discover our work <span aria-hidden="true">↓</span></a>
    </section>
  );
}
