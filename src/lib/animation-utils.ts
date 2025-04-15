
import { useEffect, useState } from "react";

// Motion system with timing presets
export const motionPresets = {
  quick: 0.2,
  default: 0.3,
  elaborate: 0.5,
};

// Reusable animation variants
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: motionPresets.default } },
  exit: { opacity: 0, transition: { duration: motionPresets.quick } },
};

export const slideIn = {
  initial: { x: -20, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: motionPresets.default } },
  exit: { x: 20, opacity: 0, transition: { duration: motionPresets.quick } },
};

export const scaleIn = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { duration: motionPresets.default } },
  exit: { scale: 0.95, opacity: 0, transition: { duration: motionPresets.quick } },
};

// Hook for intersection observer animations
export function useIntersectionAnimation(threshold = 0.1, rootMargin = "0px") {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, threshold, rootMargin, hasAnimated]);

  return { ref: setRef, isVisible, hasAnimated };
}

// Hook for reduced motion preference
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}
