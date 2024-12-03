import React from "react";
import { Modal, Box, TextField, Button } from "@mui/material";

interface EditModalProps {
  isOpen: boolean;
  editContent: string;
  onChangeContent: (value: string) => void;
  onClose: () => void;
  onSave: () => void;
  onDelete: () => void;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  editContent,
  onChangeContent,
  onClose,
  onSave,
  onDelete,
}) => (
  <Modal open={isOpen} onClose={onClose}>
    <Box
      className="bg-white p-6 rounded-md shadow-md"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "400px",
        height: "250px",
        padding: "20px",
      }}
    >
      <h2 className="text-lg font-bold mb-10">Editar To-Do</h2>
      <TextField
        fullWidth
        value={editContent}
        onChange={(e) => onChangeContent(e.target.value)}
        label="Conteúdo do To-Do"
        variant="outlined"
        className="mb-4"
      />
      <div className="flex justify-between mt-10">
        <Button variant="contained" color="primary" onClick={onSave}>
          Salvar
        </Button>
        <Button variant="outlined" color="error" onClick={onDelete}>
          Excluir
        </Button>
      </div>
    </Box>
  </Modal>
);

export default EditModal;