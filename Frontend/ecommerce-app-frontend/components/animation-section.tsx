"use client";

import { FC, ReactNode } from "react";
import { motion } from "framer-motion";

interface AnimatedSectionProps {
  children: ReactNode;
  transition?: object;
  initial?: object;
  animate?: object;
}

const AnimatedSection: FC<AnimatedSectionProps> = ({
  children,
  transition = { duration: 0.5 },
  initial = { opacity: 0, y: 20 },
  animate = { opacity: 1, y: 0 },
}) => {
  return (
    <motion.div initial={initial} animate={animate} transition={transition}>
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
