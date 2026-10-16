"use client";

import Image from "next/image";
import { useState } from "react";
import { filterPortfolio, photoSource, portfolioCategories, type PortfolioCategory } from "@/services/portfolio";

export function PortfolioGallery() {
  const [category, setCategory] = useState<PortfolioCategory>("All");
  const photos = filterPortfolio(category);

  return (
    <section id="portfolio" className="portfolio" aria-labelledby="portfolio-title">
      <div className="section-heading">
        <div><p className="eyebrow">01 / Selected work</p><h2 id="portfolio-title">Real people.<br /><em>Lasting impressions.</em></h2></div>
        <p className="portfolio-intro">From the first birthday to a moment just for you. A collection of portraits, family stories and celebrations, seen through our lens.</p>
      </div>
      <div className="portfolio-toolbar">
        <div className="portfolio-filters" role="group" aria-label="Filter photographs">
          {portfolioCategories.map((item) => <button key={item} type="button" aria-pressed={category === item} aria-controls="portfolio-grid" onClick={() => setCategory(item)}>{item}</button>)}
        </div>
        <p className="portfolio-count" role="status">{photos.length} {photos.length === 1 ? "photograph" : "photographs"}</p>
      </div>
      <p className="gallery-hint">Select a photograph to view the full image in a new tab.</p>
      <div id="portfolio-grid" className="portfolio-grid">
        {photos.map((photo) => (
          <figure className="portfolio-photo" key={photo.slug}>
            <a href={photoSource(photo)} target="_blank" rel="noopener noreferrer" aria-label={`View ${photo.title} — full photograph (opens in a new tab)`}>
              <Image src={photoSource(photo)} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 600px) 88vw, (max-width: 1000px) 42vw, 28vw" />
            </a>
            <figcaption><h3>{photo.title}</h3><span>{photo.category}</span></figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
