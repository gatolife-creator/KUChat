import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "@mui/system";
import { SearchForm } from "../components/SearchForm";
import Correspondent from "../components/Correspondent";
import Button from "@mui/joy/IconButton";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { CssVarsProvider } from "@mui/joy/styles";
import Chip from "@mui/joy/Chip";
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";

import { wallet } from "../common/common";

export const Contacts = () => {
  const navigate = useNavigate();
  const correspondents = wallet.getCorrespondents();

  const submit = (e) => {
    e.preventDefault();
    const { address } = e.target;
    if (!address.value) return false;
    navigate("/chat?address=" + address.value);
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Container className="center" maxWidth="lg" sx={{ paddingTop: "130px" }}>
        <SearchForm
          action={submit}
          placeholder="チャットしたい人のアドレスを入力"
          name="address"
        />
        <Chip sx={{ marginTop: "20px", marginBottom: "20px" }}>or</Chip>
        <br />
        <CssVarsProvider>
          <Button
            component={Link}
            to="/qrcode-reader"
            variant="solid"
            sx={{
              "--IconButton-size": "100px",
            }}
            color="success"
          >
            <QrCodeScannerIcon />
          </Button>
        </CssVarsProvider>
        <hr />
        <h3 className="mt-2">チャット履歴</h3>

        {correspondents.length > 0 ? (
          <Box sx={{ backgroundColor: "#B6C9FF" }}>
            <List
              variant="outlined"
              aria-labelledby="ellipsis-list-demo"
              sx={{ "--List-decorator-size": "56px" }}
            >
              {correspondents.map((correspondent, index) => (
                <Correspondent
                  name={correspondent}
                  address={correspondent}
                  message={"最新のメッセージ"}
                  key={index}
                />
              ))}
            </List>
          </Box>
        ) : (
          <></>
        )}
      </Container>
    </motion.main>
  );
};
