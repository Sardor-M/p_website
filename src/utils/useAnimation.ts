import { useEffect, useRef, RefObject } from 'react';

type UseScrollAnimationOptions = {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  duration?: number;
  delay?: number;
};

/**
 * Hook to handle scroll-based animations for multiple elements
 * @param count - Number of elements to animate (optional)
 * @param options - Configuration options for the IntersectionObserver
 * @returns - A function to add element refs to the collection
 */
export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
    duration = 0.6,
    delay = 0.2,
  } = options;

  const elementsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin,
      threshold,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');

          if (triggerOnce) {
            observer.unobserve(entry.target);
          }
        } else if (!triggerOnce) {
          entry.target.classList.remove('visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    /* only we observer all elements when added to the ref */
    elementsRef.current.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, duration, delay]);

  const addElementRef = (index: number) => (node: HTMLElement | null) => {
    elementsRef.current[index] = node;
  };

  return { addElementRef };
};

/**
 * Hook to handle scroll-based animations for a single element
 * @param options - Configuration options for the IntersectionObserver
 * @returns - A ref to attach to the element you want to animate
 */
export function useElementAnimation<T extends HTMLElement>(
  options: UseScrollAnimationOptions = {}
): RefObject<T> {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
    duration = 0.6,
    delay = 0,
  } = options;

  const elementRef = useRef<T>(null);

  useEffect(() => {
    const currentElement = elementRef.current;
    if (!currentElement) return;

    const observerOptions = {
      root: null,
      rootMargin,
      threshold,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          currentElement.classList.add('visible');

          if (triggerOnce) {
            observer.unobserve(currentElement);
          }
        } else if (!triggerOnce) {
          currentElement.classList.remove('visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    observer.observe(currentElement);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, duration, delay]);

  return elementRef as RefObject<T>;
}

/**
 * Creates staggered animation for multiple elements
 * @param baseDelay - Base delay in seconds before animations start
 * @param increment - Time increment in seconds between each element animation
 * @param count - Number of elements
 * @returns - Array of style objects with appropriate delay
 */
export const createStaggeredAnimations = (
  baseDelay: number = 0.1,
  increment: number = 0.1,
  count: number
): React.CSSProperties[] => {
  return Array.from({ length: count }, (_, index) => ({
    transitionDelay: `${baseDelay + index * increment}s`,
  }));
};

export default {
  useScrollAnimation,
  useElementAnimation,
  createStaggeredAnimations,
};
