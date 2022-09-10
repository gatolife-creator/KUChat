import { Container } from "@mui/material";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";

import { motion } from "framer-motion";
import React from "react";

// import { genMnemonic } from "../ts/mnemonic";
// genMnemonic();

export const Signup = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Container maxWidth="lg" sx={{ paddingTop: "100px" }}>
        <Button variant="contained" size="large">
          パスフレーズを生成する
        </Button>
        <br />
        <TextField
          label="パスフレーズ"
          variant="filled"
          value={"これはテストです"}
          color="success"
          InputProps={{
            readOnly: true,
          }}
        />
      </Container>
    </motion.main>
  );
};
