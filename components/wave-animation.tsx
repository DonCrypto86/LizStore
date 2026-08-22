"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";

type LottieAnimation = { destroy: () => void };
type LottieWindow = Window & {
  lottie?: {
    loadAnimation: (options: {
      container: HTMLElement;
      renderer: "svg";
      loop: boolean;
      autoplay: boolean;
      path: string;
    }) => LottieAnimation;
  };
};

export function WaveAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<LottieAnimation | null>(null);

  const startAnimation = useCallback(() => {
    const lottie = (window as LottieWindow).lottie;
    if (!lottie || !containerRef.current || animationRef.current) return;
    animationRef.current = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/animations/wave-animation.json"
    });
  }, []);

  useEffect(() => {
    startAnimation();
    return () => {
      animationRef.current?.destroy();
      animationRef.current = null;
    };
  }, [startAnimation]);

  return (
    <div className="wave-animation" aria-hidden="true">
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.12.2/lottie.min.js" strategy="afterInteractive" onLoad={startAnimation} />
      <div ref={containerRef} />
    </div>
  );
}
