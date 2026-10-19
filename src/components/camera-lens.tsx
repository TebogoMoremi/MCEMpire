"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/lib/use-media-query";

const LensScene = dynamic(() => import("./lens-scene"), { ssr: false });

export function CameraLens() {
  const host = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [failed, setFailed] = useState(false);
  const capable = useMediaQuery("(min-width: 900px) and (pointer: fine)", false);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)", true);
  useEffect(() => {
    if (!capable || reduced || !host.current || navigator.hardwareConcurrency <= 4) return;
    let inView = false;
    const update = () => setActive(inView && document.visibilityState === "visible");
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; update(); });
    observer.observe(host.current);
    document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, [capable, reduced]);
  return <section className="studio-intro" aria-labelledby="intro-title">
    <div><p className="eyebrow">The art of paying attention</p><h2 id="intro-title">Life moves.<br /><em>We keep the feeling.</em></h2><p>From quiet portraits to celebrations shared with everyone you love. M.E.C Empire brings photography, film and printed memories together, with your story at the centre.</p><a className="text-link" href="#portfolio">See through our lens ↗</a></div>
    <div className="lens-stage" ref={host} aria-hidden="true">
      <div className="static-lens"><span /><i /></div>
      {active && capable && !reduced && !failed && <LensScene onFailure={() => setFailed(true)} />}
      <span className="lens-caption">M.E.C / A different perspective</span>
    </div>
  </section>;
}
