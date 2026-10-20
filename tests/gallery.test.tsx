// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { PortfolioGallery } from "../src/components/portfolio-gallery";
import { SiteHeader } from "../src/components/site-header";
beforeEach(() => {
  HTMLDialogElement.prototype.showModal = function () { this.setAttribute("open", ""); };
  vi.stubGlobal("matchMedia", vi.fn(() => ({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() })));
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
it("opens the selected photo, navigates, closes and restores focus", () => {
  render(<PortfolioGallery />);
  const trigger = screen.getByRole("button", { name: /View The last light/ });
  trigger.focus(); fireEvent.click(trigger);
  const dialog = screen.getByRole("dialog");
  expect(document.body.style.overflow).toBe("hidden");
  fireEvent.keyDown(dialog, { key: "ArrowRight" });
  expect(dialog.textContent).toContain("Together, always");
  fireEvent.click(screen.getByRole("button", { name: "Close photography viewer" }));
  expect(screen.queryByRole("dialog")).toBeNull();
  expect(document.activeElement).toBe(trigger);
  expect(document.body.style.overflow).toBe("");
});
it("opens and closes mobile navigation with Escape", () => {
  render(<SiteHeader />);
  const button = screen.getByRole("button", { name: /Menu/ });
  fireEvent.click(button);
  expect(button.getAttribute("aria-expanded")).toBe("true");
  fireEvent.keyDown(button, { key: "Escape" });
  expect(button.getAttribute("aria-expanded")).toBe("false");
  expect(document.activeElement).toBe(button);
});
