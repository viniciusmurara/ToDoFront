import React, { useState } from "react";
import { Box, Typography, TextField, Button, Link } from "@mui/material";

export default function Register() {

  const [email, setEmail] = useState<String | null>("");
  const [nome, setNome] = useState<String | null>("");
  const [senha, setSenha] = useState<String | null>("");

  const criarUsuario = async () => {



    try {
      const response = await fetch("http://localhost:8081/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          nome: nome,
          senha: senha,
          role: "operador"
        })
      })

    } catch (error) {
      console.log(error);

    }
  }


  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="grey.100"
    >
      <Box
        bgcolor="white"
        p={4}
        borderRadius={2}
        boxShadow={3}
        width="100%"
        maxWidth="400px"
      >
        <Typography variant="h4" fontWeight="bold" textAlign="center" color="text.primary" mb={3}>
          Cadastro
        </Typography>
        <form>
          <TextField
            fullWidth
            id="name"
            type="text"
            label="Nome Completo"
            placeholder="Digite seu nome completo"
            margin="normal"
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <TextField
            fullWidth
            id="email"
            type="email"
            label="Email"
            placeholder="Digite seu email"
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            id="password"
            type="password"
            label="Senha"
            placeholder="Digite sua senha"
            onChange={(e) => setSenha(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            id="confirm-password"
            type="password"
            label="Confirmar Senha"
            placeholder="Confirme sua senha"
            margin="normal"
            required
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            onClick={criarUsuario}
            sx={{ mt: 2 }}
          >
            Cadastrar
          </Button>
        </form>
        <Typography mt={2} textAlign="center" variant="body2" color="text.secondary">
          Já tem uma conta?{" "}
          <Link href="/auth/login" color="primary" underline="hover">
            Faça login
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}