import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Input } from "@mui/material";
import { InputAdornment } from "@mui/material";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TipDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton aria-label="delete" size="large" onClick={handleClickOpen}>
        <FavoriteBorderIcon />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <DialogTitle>KUGreen を送る</DialogTitle>
        <DialogContent>
          <DialogContentText>
            この機能は開発中です。しばらくお待ちください。
          </DialogContentText>
          <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
            <Input
              id="standard-adornment-amount"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              autoComplete="off"
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} >キャンセル</Button>
          <Button type="submit" onClick={handleClose} variant="contained">
            送る
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
