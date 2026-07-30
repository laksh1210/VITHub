"use client";

import { motion } from "framer-motion";
import { staggerContainer, slideUp } from "@/lib/motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is VITHub?",
    answer: "VITHub is an AI-powered Digital Twin of the campus. It aggregates real-time data from various campus services (like room occupancy, shuttle locations, and library systems) into a single, cohesive platform."
  },
  {
    question: "Who can use it?",
    answer: "VITHub is designed for students, faculty, and campus staff. You need a valid institutional email address to register and access authenticated features."
  },
  {
    question: "Is the information real-time?",
    answer: "Yes, data such as shuttle locations, classroom occupancy, and library availability are synced in real-time to give you the most accurate snapshot of the campus."
  },
  {
    question: "Is it mobile friendly?",
    answer: "Absolutely. VITHub is built as a responsive progressive web application (PWA) that feels native and fast on any mobile device, tablet, or desktop."
  }
];

export function LandingFaq() {
  return (
    <section id="faq" className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.h2 variants={slideUp} className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Frequently Asked Questions
          </motion.h2>
          <motion.p variants={slideUp} className="text-lg text-muted-foreground">
            Everything you need to know about the platform.
          </motion.p>
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <Accordion className="w-full">
            {faqs.map((faq, idx) => (
              <motion.div key={idx} variants={slideUp}>
                <AccordionItem value={`item-${idx}`}>
                  <AccordionTrigger className="text-left text-lg font-medium">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
