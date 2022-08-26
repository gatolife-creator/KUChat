import { motion } from "framer-motion";
import { Fibonacci } from "../components/Script/Fibonacci";
import { ManyTriangles } from "../components/Script/ManyTriangles";
import { PerpendicularBisector } from "../components/Script/PerpendicularBisector";

export const NotFound = () => {
  const random = (Math.random() * 3) | 0;

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="container px-4 pt-5 text-center">
        {random === 0 ? (
          <Fibonacci />
        ) : random === 1 ? (
          <ManyTriangles />
        ) : random === 2 ? (
          <PerpendicularBisector />
        ) : (
          <></>
        )}
      </div>
    </motion.main>
  );
};
