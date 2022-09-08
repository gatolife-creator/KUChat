import { motion } from "framer-motion";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { InputAdornment } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import { Container } from "@mui/material";

import { Link } from "react-router-dom";

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
      {/* <form method="post" action="/signin-attempt" autoComplete="off">
        <img
          className="mb-4"
          src=""
          alt=""
          width="72"
          height="72"
        />
        <h1 className="h3 mb-5 fw-normal">Please sign in</h1>

        <div className="form-floating">
          <input
            className="form-control"
            name="mnemonic"
            id="floatingInput"
            placeholder="Passphrase"
          />
          <label htmlFor="floatingInput">Passphrase</label>
        </div>

        <button className="mt-5 btn btn-lg btn-primary" type="submit">
          Sign in
        </button>
        <p className="mt-5 mb-3">
          No passphrase with you? Please <Link to="/signup">sign up</Link>.
        </p>
        <p className="mt-5 mb-3 text-muted">&copy; 2021</p>
      </form> */}
    </motion.main>
  );
};
