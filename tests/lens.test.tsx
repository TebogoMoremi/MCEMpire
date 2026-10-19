// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { CameraLens } from "../src/components/camera-lens";

afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
it("keeps an accessible introduction and static fallback on small or reduced-motion devices", () => {
  vi.stubGlobal("matchMedia", vi.fn((query: string) => ({ matches: query.includes("reduced-motion"), addEventListener: vi.fn(), removeEventListener: vi.fn() })));
  const observe = vi.fn();
  vi.stubGlobal("IntersectionObserver", class { observe = observe; disconnect = vi.fn(); });
  const { container } = render(<CameraLens />);
  expect(screen.getByRole("heading", { name: /Life moves/ })).toBeTruthy();
  expect(container.querySelector(".static-lens")).toBeTruthy();
  expect(container.querySelector("canvas")).toBeNull();
  expect(observe).not.toHaveBeenCalled();
});
