import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import Home from "../src/app/page";

describe("photography homepage", () => {
  it("renders each service and makes the navigation target available", () => {
    const html = renderToStaticMarkup(<Home />);
    expect(html).toContain('id="services"');
    expect(html).toContain('href="#services"');
    for (const title of ["Portraits", "Celebrations", "Brand stories"]) {
      expect(html).toContain(`<h3>${title}</h3>`);
    }
  });

  it("renders the portfolio while keeping booking availability accurate", () => {
    const html = renderToStaticMarkup(<Home />);
    expect(html).toContain('id="portfolio"');
    expect(html).toContain("Online booking is in development");
    expect(html).not.toContain("<form");
  });
});
