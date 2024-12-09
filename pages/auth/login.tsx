import React, { useEffect } from "react";
import { Box, Typography, TextField, Button, Link } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {

  const router = useRouter();
  // interface user{
  //   "id" : number,
  //   nome : string,

  // }
  interface User {
    id: number,
    nome: string,
    email: string,
    role: string
  };

  const [user, setUser] = useState<User | null>(null);
  const [login, setLogin] = useState<String | null>("")
  const [senha, setSenha] = useState<String | null>("")
  const [erroLogin, setErroLogin] = useState<String | null>(null);

  const getUserByLogin = async () => {

    try {

      const response = await fetch(`http://localhost:8081/usuarios/login?email=${login}&senha=${senha}`)

      if (!response.ok) {
        throw new Error('Erro na resposta da API');
      }

      const data = await response.json()

      return data;

    } catch (error) {
      console.log(error);

    }
  }

  const handleLoginFormSubmit = async (e: any) => {

    e.preventDefault();

    const resposta = await getUserByLogin();

    if (resposta) {
      const usuario: User = {
        id: resposta.id,
        nome: resposta.nome,
        email: resposta.email,
        role: resposta.role
      }
      document.cookie = `Usuario=${JSON.stringify(usuario)}; path=/;`;
      setUser(usuario);
      router.push("/todo")

    }
    else {
      setErroLogin("Usuario ou senha incorretos")
    }
  }
  console.log();


  return (
    <>

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
            {erroLogin !== null && (
              <p className="text-center text-red-600 text-2xl">{erroLogin}</p>
            )}
            <form>
              <TextField
                fullWidth
                id="email"
                type="email"
                label="Email"
                placeholder="Digite seu email"
                margin="normal"
                onChange={(e) => setLogin(e.target.value)}
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
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                onClick={(e) => handleLoginFormSubmit(e)}
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
      

    </>
  );
}
