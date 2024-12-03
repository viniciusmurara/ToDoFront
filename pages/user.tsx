import React, { useState } from "react";
import Header from "@/components/Header";
import UserTable from "@/components/UserTable";
import {
  Modal,
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

type User = {
  id: number;
  nome: string;
  email: string;
  role: string;
};

const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState<User>({
    id: users.length + 1,
    nome: "",
    email: "",
    role: "USER",
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleOpenModal = (user?: User) => {
    if (user) {
      setNewUser(user);
      setIsEditing(true);
    } else {
      setNewUser({ id: users.length + 1, nome: "", email: "", role: "USER" });
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveUser = () => {
    if (isEditing) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === newUser.id ? { ...user, ...newUser } : user
        )
      );
    } else {
      setUsers((prevUsers) => [...prevUsers, newUser]);
    }
    setIsModalOpen(false);
  };

  const handleInputChange = (field: keyof User, value: string) => {
    setNewUser((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="">
      <Header /> {/* Aqui adicionamos o Header na página */}
      <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Gerenciamento de Usuários</h1>
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={() => handleOpenModal()}
        >
          Adicionar Usuário
        </button>
      </div>
      <UserTable
        users={users}
        onEdit={handleOpenModal}
        onDelete={(id) => setUsers(users.filter((user) => user.id !== id))}
      />
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          className="bg-white p-6 rounded-md shadow-md"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <h2 className="text-lg font-bold mb-4">
            {isEditing ? "Editar Usuário" : "Adicionar Usuário"}
          </h2>
          <TextField
            fullWidth
            label="Nome"
            variant="outlined"
            value={newUser.nome}
            onChange={(e) => handleInputChange("nome", e.target.value)}
            className="mb-4"
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={newUser.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="mb-4"
          />
          <FormControl fullWidth className="mb-4">
            <InputLabel id="role-label">Papel</InputLabel>
            <Select
              labelId="role-label"
              value={newUser.role}
              onChange={(e) => handleInputChange("role", e.target.value)}
              label="Papel"
            >
              <MenuItem value="USER">USER</MenuItem>
              <MenuItem value="ADMIN">ADMIN</MenuItem>
            </Select>
          </FormControl>
          <div className="flex justify-end gap-4">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveUser}
            >
              {isEditing ? "Salvar Alterações" : "Salvar"}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCloseModal}
            >
              Cancelar
            </Button>
          </div>
        </Box>
      </Modal>
      </div>
    </div>
  );
};

export default Home;
