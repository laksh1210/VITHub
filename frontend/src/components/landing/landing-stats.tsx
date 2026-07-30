"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { staggerContainer, slideUp } from "@/lib/motion";

const stats = [
  { label: "Buildings", value: 12 },
  { label: "Classrooms", value: 340 },
  { label: "Students", value: 35000 },
  { label: "Events", value: 120 },
  { label: "Maintenance Requests", value: 850 },
];

function AnimatedCounter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 1500;
      const increment = value / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{count.toLocaleString()}+</span>;
}

export function LandingStats() {
  return (
    <section className="py-24 px-4 bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center"
        >
          {stats.map((stat, idx) => (
            <motion.div key={idx} variants={slideUp} className="flex flex-col gap-2">
              <div className="text-4xl md:text-5xl font-extrabold tracking-tighter">
                <AnimatedCounter value={stat.value} />
              </div>
              <div className="text-sm md:text-base font-medium opacity-80 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
