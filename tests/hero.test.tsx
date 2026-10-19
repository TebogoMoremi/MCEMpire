// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { HeroSlider } from "../src/components/hero-slider";

let reduced = false;
beforeEach(() => {
  reduced = false;
  vi.stubGlobal("matchMedia", vi.fn(() => ({ matches: reduced, addEventListener: vi.fn(), removeEventListener: vi.fn() })));
  Object.defineProperty(document, "visibilityState", { configurable: true, value: "visible" });
});
afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); });

describe("cinematic hero", () => {
  it("supports arrows, pagination, keyboard navigation and correct package links", () => {
    render(<HeroSlider />);
    expect(screen.getByRole("link", { name: /Explore weddings/ }).getAttribute("href")).toBe("#weddings");
    fireEvent.click(screen.getByRole("button", { name: "Next slide" }));
    expect(screen.getByRole("link", { name: /Explore matric packages/ }).getAttribute("href")).toBe("#matric");
    fireEvent.keyDown(screen.getByRole("region", { name: "Photography highlights" }), { key: "ArrowLeft" });
    expect(screen.getByRole("heading", { level: 1 }).textContent).toContain("Every love story");
    fireEvent.click(screen.getByRole("button", { name: /Show slide 3/ }));
    expect(screen.getByRole("heading", { level: 1 }).textContent).toContain("More than a photo");
  });
  it("advances every six seconds and pauses on hover, hidden tabs and explicit pause", () => {
    vi.useFakeTimers();
    render(<HeroSlider />);
    const region = screen.getByRole("region", { name: "Photography highlights" });
    act(() => vi.advanceTimersByTime(6000));
    expect(screen.getByRole("heading", { level: 1 }).textContent).toContain("Your moment");
    fireEvent.mouseEnter(region);
    act(() => vi.advanceTimersByTime(12000));
    expect(screen.getByRole("heading", { level: 1 }).textContent).toContain("Your moment");
    fireEvent.mouseLeave(region);
    Object.defineProperty(document, "visibilityState", { configurable: true, value: "hidden" });
    fireEvent(document, new Event("visibilitychange"));
    act(() => vi.advanceTimersByTime(6000));
    expect(screen.getByRole("heading", { level: 1 }).textContent).toContain("Your moment");
    Object.defineProperty(document, "visibilityState", { configurable: true, value: "visible" });
    fireEvent(document, new Event("visibilitychange"));
    fireEvent.click(screen.getByRole("button", { name: "Pause slideshow" }));
    act(() => vi.advanceTimersByTime(6000));
    expect(screen.getByRole("heading", { level: 1 }).textContent).toContain("Your moment");
    fireEvent.click(screen.getByRole("button", { name: "Resume slideshow" }));
    act(() => vi.advanceTimersByTime(6000));
    expect(screen.getByRole("heading", { level: 1 }).textContent).toContain("More than a photo");
  });
  it("disables autoplay for reduced motion and supports touch swipes", () => {
    reduced = true;
    vi.useFakeTimers();
    render(<HeroSlider />);
    act(() => vi.advanceTimersByTime(18000));
    expect(screen.getByRole("heading", { level: 1 }).textContent).toContain("Every love story");
    expect(screen.queryByRole("button", { name: "Pause slideshow" })).toBeNull();
    const region = screen.getByRole("region", { name: "Photography highlights" });
    fireEvent.touchStart(region, { touches: [{ clientX: 200, clientY: 30 }] });
    fireEvent.touchEnd(region, { changedTouches: [{ clientX: 60, clientY: 35 }] });
    expect(screen.getByRole("heading", { level: 1 }).textContent).toContain("Your moment");
  });
});
