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

  it("clearly indicates that portfolio and bookings are not yet available", () => {
    const html = renderToStaticMarkup(<Home />);
    expect(html).toContain("Our portfolio and booking experience are on their way.");
    expect(html).not.toContain("<form");
  });
});
