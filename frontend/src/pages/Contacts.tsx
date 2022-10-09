import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "@mui/system";
import { SearchForm } from "../components/SearchForm";

import { blockchain } from "../common/common";
import { wallet } from "../common/common";
import Avatar from "boring-avatars";

export const Contacts = () => {
  const navigate = useNavigate();

  wallet.blockchain = blockchain;
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
        <br />
        <div className="w-full overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {correspondents.length > 0 ? (
                correspondents.map((correspondent, index) => (
                  <tr key={index}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <Link to={`/chat?address=${correspondent}`}>
                          <Avatar
                            size={40}
                            name={correspondent}
                            variant="beam"
                            colors={[
                              "#92A1C6",
                              "#146A7C",
                              "#F0AB3D",
                              "#C271B4",
                              "#C20D90",
                            ]}
                          />
                        </Link>
                        <div>
                          <div className="font-bold">
                            <Link to={`/chat?address=${correspondent}`}>
                              {correspondent}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <Link to={`/chat?address=${correspondent}`}>
                        Zemlak, Daniel and Leannon
                      </Link>
                      <br />
                    </td>
                  </tr>
                ))
              ) : (
                <></>
              )}
            </tbody>
          </table>
        </div>
      </Container>
    </motion.main>
  );
};
