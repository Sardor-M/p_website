import { useRef, useEffect, RefObject } from 'react';

type BaseAnimationConfig = {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  duration?: number;
};

export const useBaseAnimation = <T extends HTMLElement>(
  dependencies: any[] = [],
  config: BaseAnimationConfig = {}
) => {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true, duration = 0.1 } = config;

  const elementRef = useRef<T>(null);
  const hasBeenVisible = useRef(false);

  useEffect(() => {
    const currentElement = elementRef.current;
    if (!currentElement) return;

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          currentElement.classList.add('visible');
          hasBeenVisible.current = true;
          if (triggerOnce) observer.unobserve(currentElement);
        }
      });
    };

    if (hasBeenVisible.current && triggerOnce) {
      currentElement.classList.add('visible');
      return;
    }

    const observer = new IntersectionObserver(observerCallback, {
      threshold,
      rootMargin,
    });
    observer.observe(currentElement);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce, duration, ...dependencies]);

  return elementRef as RefObject<T>;
};
