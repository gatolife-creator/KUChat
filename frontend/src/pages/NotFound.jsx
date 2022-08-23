import { motion } from "framer-motion";
import { Fibonacci } from "../components/Fibonacci";

export const NotFound = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="container px-4 pt-5 text-center">
        <Fibonacci />
      </div>
    </motion.main>
  );
};
