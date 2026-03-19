import { motion } from "framer-motion";

const variants = {
  initial: { 
    opacity: 0, 
    filter: "blur(20px)",
  },
  animate: { 
    opacity: 1, 
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1]
    }
  },
  exit: { 
    opacity: 0, 
    filter: "blur(20px)",
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1]
    }
  },
};

export default function PageWrapper({ children }) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      className="w-full min-h-screen"
      style={{ position: "relative" }}
    >
      {children}
    </motion.div>
  );
}