import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const About = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Link to="/">home</Link>
    </motion.main>
  );
};
