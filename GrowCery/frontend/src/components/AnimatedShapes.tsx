import { motion } from "framer-motion";
import { useEffect } from "react";

interface AnimatedShapesProps {
  shouldAnimate?: boolean;
}

export default function AnimatedShapes({ shouldAnimate }: AnimatedShapesProps) {
  // Clear animation state on component mount (first load)
  useEffect(() => {
    if (shouldAnimate !== false) {
      sessionStorage.removeItem('shapesAnimated');
    }
  }, []);

  // Only animate if shouldAnimate is not false AND animation hasn't played yet
  const shouldPlayAnimation = shouldAnimate !== false && sessionStorage.getItem('shapesAnimated') !== 'true';

  useEffect(() => {
    if (shouldPlayAnimation) {
      sessionStorage.setItem('shapesAnimated', 'true');
    }
  }, [shouldPlayAnimation]);

  const shapeVariants = (delay = 0, x = 0, y = 0) => ({
    hidden: { opacity: 0, x, y },
    visible: { opacity: 1, x: 0, y: 0, transition: { delay, duration: 0.8 } },
  });

  return (
    <div className="hidden md:flex w-1/2 h-screen items-center justify-center">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 800 800"
        className="w-full h-full"
      >
        <motion.circle
          variants={shapeVariants(0.1, -40, 0)}
          initial={shouldPlayAnimation ? "hidden" : "visible"}
          animate="visible"
          cx="200"
          cy="650"
          r="140"
          fill="#6200EE"
        />
        <motion.circle
          variants={shapeVariants(0.2, 40, 0)}
          initial={shouldPlayAnimation ? "hidden" : "visible"}
          animate="visible"
          cx="450"
          cy="450"
          r="100"
          fill="#7C3AED"
        />
        <motion.circle
          variants={shapeVariants(0.3, 0, -40)}
          initial={shouldPlayAnimation ? "hidden" : "visible"}
          animate="visible"
          cx="200"
          cy="350"
          r="90"
          fill="#A78BFA"
        />
        <motion.circle
          variants={shapeVariants(0.4, 0, 40)}
          initial={shouldPlayAnimation ? "hidden" : "visible"}
          animate="visible"
          cx="320"
          cy="150"
          r="50"
          fill="#C4B5FD"
        />
        <motion.circle
          variants={shapeVariants(0.5, -30, 30)}
          initial={shouldPlayAnimation ? "hidden" : "visible"}
          animate="visible"
          cx="500"
          cy="200"
          r="45"
          fill="#8B5CF6"
        />
        <motion.circle
          variants={shapeVariants(0.6, 30, -30)}
          initial={shouldPlayAnimation ? "hidden" : "visible"}
          animate="visible"
          cx="600"
          cy="100"
          r="35"
          fill="#E9D5FF"
        />
        <motion.circle
          variants={shapeVariants(0.7, 0, 30)}
          initial={shouldPlayAnimation ? "hidden" : "visible"}
          animate="visible"
          cx="700"
          cy="80"
          r="20"
          fill="#fff"
        />
        <motion.circle
          variants={shapeVariants(0.8, 0, -30)}
          initial={shouldPlayAnimation ? "hidden" : "visible"}
          animate="visible"
          cx="750"
          cy="300"
          r="12"
          fill="#fff"
        />
        <motion.circle
          variants={shapeVariants(0.9, 30, 0)}
          initial={shouldPlayAnimation ? "hidden" : "visible"}
          animate="visible"
          cx="120"
          cy="400"
          r="12"
          fill="#fff"
        />
        <motion.circle
          variants={shapeVariants(1.0, -30, 0)}
          initial={shouldPlayAnimation ? "hidden" : "visible"}
          animate="visible"
          cx="700"
          cy="600"
          r="20"
          fill="#A78BFA"
        />
        <motion.circle
          variants={shapeVariants(1.1, 0, 30)}
          initial={shouldPlayAnimation ? "hidden" : "visible"}
          animate="visible"
          cx="600"
          cy="700"
          r="25"
          fill="#C4B5FD"
        />
        <motion.line
          variants={shapeVariants(0.2, -40, 0)}
          initial={shouldPlayAnimation ? "hidden" : "visible"}
          animate="visible"
          x1="100"
          y1="100"
          x2="350"
          y2="160"
          stroke="#7C3AED"
          strokeWidth="7"
        />
        <motion.line
          variants={shapeVariants(0.3, 40, 0)}
          initial={shouldPlayAnimation ? "hidden" : "visible"}
          animate="visible"
          x1="500"
          y1="250"
          x2="780"
          y2="300"
          stroke="#A78BFA"
          strokeWidth="7"
        />
        <motion.line
          variants={shapeVariants(0.4, 0, -40)}
          initial={shouldPlayAnimation ? "hidden" : "visible"}
          animate="visible"
          x1="150"
          y1="500"
          x2="400"
          y2="550"
          stroke="#8B5CF6"
          strokeWidth="7"
        />
        <motion.line
          variants={shapeVariants(0.5, 0, 40)}
          initial={shouldPlayAnimation ? "hidden" : "visible"}
          animate="visible"
          x1="400"
          y1="700"
          x2="700"
          y2="750"
          stroke="#6200EE"
          strokeWidth="7"
        />
        <motion.line
          variants={shapeVariants(0.6, -30, 30)}
          initial={shouldPlayAnimation ? "hidden" : "visible"}
          animate="visible"
          x1="500"
          y1="350"
          x2="600"
          y2="400"
          stroke="#C4B5FD"
          strokeWidth="7"
        />
        <motion.line
          variants={shapeVariants(0.7, 30, -30)}
          initial={shouldPlayAnimation ? "hidden" : "visible"}
          animate="visible"
          x1="100"
          y1="700"
          x2="400"
          y2="750"
          stroke="#E9D5FF"
          strokeWidth="7"
        />
      </svg>
    </div>
  );
}