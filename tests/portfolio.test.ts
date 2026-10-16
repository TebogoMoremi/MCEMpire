import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";
import { filterPortfolio, photoSource, portfolioPhotos } from "../src/services/portfolio";

describe("portfolio collection", () => {
  it("ships eight distinct supplied images with accessible descriptions", () => {
    const hashes = portfolioPhotos.map((photo) => {
      const path = join(process.cwd(), "public", photoSource(photo));
      expect(existsSync(path)).toBe(true);
      expect(photo.alt.length).toBeGreaterThan(20);
      return createHash("sha256").update(readFileSync(path)).digest("hex");
    });
    expect(hashes).toHaveLength(8);
    expect(new Set(hashes).size).toBe(8);
  });

  it("filters the collection and restores all photos", () => {
    expect(filterPortfolio("Portraits").map((photo) => photo.slug)).toEqual(["sunset-portrait", "roses-studio"]);
    expect(filterPortfolio("Family")).toHaveLength(1);
    expect(filterPortfolio("Celebrations")).toHaveLength(4);
    expect(filterPortfolio("Prints")[0].slug).toBe("portrait-print");
    expect(filterPortfolio("All")).toHaveLength(8);
  });
});
