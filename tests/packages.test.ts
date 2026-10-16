import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { contact, enquiryLink, packages } from "../src/services/packages";

describe("published brochures", () => {
  it("preserves the supplied package prices and includes each poster", () => {
    expect(packages.map((group) => group.options.map((option) => option.price))).toEqual([
      [3000, 4500, 5500], [1000, 1700, 2500], [250, 450, 750, 1000], [2500, 3500, 4500, 5500],
    ]);
    for (const group of packages) {
      expect(existsSync(join(process.cwd(), "public/images/offers", `${group.image}.jpeg`))).toBe(true);
    }
    expect(existsSync(join(process.cwd(), "public/images/offers/booking-guide.jpeg"))).toBe(true);
  });

  it("routes enquiries and calls to the supplied business numbers", () => {
    const link = new URL(enquiryLink("Wedding photography & film"));
    expect(link.origin).toBe("https://wa.me");
    expect(link.pathname).toBe("/27724804210");
    expect(link.searchParams.get("text")).toContain("Wedding photography & film");
    expect(contact.phoneHref).toBe("tel:+27847635834");
  });
});
