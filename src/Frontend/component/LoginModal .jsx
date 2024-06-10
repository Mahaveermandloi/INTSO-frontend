// LoginModal.js
import React from "react";
import { Modal } from "@mui/material";
import Login from "./Login/Login";

const LoginModal = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <Login notShow={onClose} />
    </Modal>
  );
};

export default LoginModal;
