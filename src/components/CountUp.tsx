import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CountUpProps {
  /** The numeric end value */
  end: number;
  /** Optional suffix appended after the number, e.g. "+" or "%" */
  suffix?: string;
  /** Optional prefix prepended before the number */
  prefix?: string;
  /** Animation duration in seconds */
  duration?: number;
  /** Extra className for the wrapping span */
  className?: string;
}

/**
 * Animates a number from 0 to `end` using an ease-out cubic curve,
 * starting only when the element scrolls into view (fires once).
 */
const CountUp = ({
  end,
  suffix = "",
  prefix = "",
  duration = 1.8,
  className = "",
}: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const totalMs = duration * 1000;

    const tick = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / totalMs, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

export default CountUp;
