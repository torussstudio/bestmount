import { motion } from "framer-motion";

const MotionDiv = motion.div;

const variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.25,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function PageWrapper({ children }) {
  return (
    <MotionDiv
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      className="w-full min-h-screen"
      style={{ position: "relative" }}
    >
      {children}
    </MotionDiv>
  );
}