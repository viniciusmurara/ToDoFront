import React from "react";
import { Modal, Box, Typography } from "@mui/material";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode; // Botões de ação (opcional)
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onClose, title, children, actions }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          width: "400px", // Manter largura original
          height: "250px", // Manter altura original
          padding: "20px",
        }}
      >
        <Typography variant="h6" component="h2" style={{ marginBottom: "40px" }}>
          {title}
        </Typography>
        <div>{children}</div>
        {actions && (
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "40px" }}>
            {actions}
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default CustomModal;