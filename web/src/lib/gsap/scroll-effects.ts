import { gsap, ScrollTrigger } from "./register";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function createParallax(
  element: HTMLElement,
  trigger: HTMLElement,
  speed = -20
) {
  if (prefersReducedMotion()) return () => {};

  const tween = gsap.to(element, {
    yPercent: speed,
    ease: "none",
    scrollTrigger: {
      trigger,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });

  return () => tween.kill();
}

export function createImageExpand(
  element: HTMLElement,
  trigger: HTMLElement,
  options?: { startScale?: number; scrub?: number }
) {
  if (prefersReducedMotion()) return () => {};

  const { startScale = 1.15, scrub = 1.2 } = options ?? {};

  const tween = gsap.fromTo(
    element,
    { scale: startScale, yPercent: 8 },
    {
      scale: 1,
      yPercent: 0,
      ease: "none",
      scrollTrigger: {
        trigger,
        start: "top bottom",
        end: "center center",
        scrub,
      },
    }
  );

  return () => tween.kill();
}

export function createRevealStagger(
  container: HTMLElement,
  selector = "[data-reveal]",
  options?: { y?: number; stagger?: number }
) {
  if (prefersReducedMotion()) return () => {};

  const { y = 40, stagger = 0.08 } = options ?? {};
  const items = container.querySelectorAll(selector);
  if (!items.length) return () => {};

  const tween = gsap.from(items, {
    opacity: 0,
    y,
    duration: 0.8,
    stagger,
    ease: "power3.out",
    scrollTrigger: {
      trigger: container,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });

  return () => tween.kill();
}

export function refreshScrollTrigger() {
  if (typeof window === "undefined") return;
  ScrollTrigger.refresh();
}
