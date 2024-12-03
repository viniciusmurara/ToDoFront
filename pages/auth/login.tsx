import React from "react";
import { Box, Typography, TextField, Button, Link } from "@mui/material";

export default function Login() {
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
          Login
        </Typography>
        <form>
          <TextField
            fullWidth
            id="email"
            type="email"
            label="Email"
            placeholder="Digite seu email"
            margin="normal"
            required
          />
          <TextField
            fullWidth
            id="password"
            type="password"
            label="Senha"
            placeholder="Digite sua senha"
            margin="normal"
            required
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Entrar
          </Button>
        </form>
        <Typography mt={2} textAlign="center" variant="body2" color="text.secondary">
          Não tem uma conta?{" "}
          <Link href="/auth/register" color="primary" underline="hover">
            Cadastre-se
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
