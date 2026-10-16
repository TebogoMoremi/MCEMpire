import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import Home from "../src/app/page";

describe("photography homepage", () => {
  it("renders each service and makes the navigation target available", () => {
    const html = renderToStaticMarkup(<Home />);
    expect(html).toContain('id="services"');
    expect(html).toContain('href="#packages"');
    for (const title of ["Portraits", "Celebrations", "Canvas prints"]) {
      expect(html).toContain(`<h3>${title}</h3>`);
    }
  });

  it("renders the portfolio while keeping booking availability accurate", () => {
    const html = renderToStaticMarkup(<Home />);
    expect(html).toContain('id="portfolio"');
    expect(html).toContain("an enquiry does not reserve a date");
    expect(html).not.toContain("<form");
  });
});
