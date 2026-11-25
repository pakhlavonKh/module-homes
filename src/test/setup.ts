import "@testing-library/jest-dom";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// jsdom has no IntersectionObserver; framer-motion's useInView (CountUp) needs one.
class IntersectionObserverStub {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds: number[] = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

if (!("IntersectionObserver" in window)) {
  Object.defineProperty(window, "IntersectionObserver", {
    writable: true,
    value: IntersectionObserverStub,
  });
}
