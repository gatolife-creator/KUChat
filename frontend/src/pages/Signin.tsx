import { motion } from "framer-motion";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { InputAdornment } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import { Container } from "@mui/material";

import React from "react";

export const Signin = () => {
  return (
    <motion.main
      className="form-signin text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Container sx={{ paddingTop: "100px" }}>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            // onChange={handleChange("amount")}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
          />
        </FormControl>
      </Container>
    </motion.main>
  );
};
