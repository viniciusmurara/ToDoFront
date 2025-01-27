import React, { useEffect } from "react";
import { Box, Typography, TextField, Button, Link } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/router";
import User from "@/Model/User";
import useAuthContext from "@/Hooks/UseAuthContext";

export default function Login() {

  const router = useRouter();
  const {user, setUser} = useAuthContext();
  const [login, setLogin] = useState<String | null>("")
  const [senha, setSenha] = useState<String | null>("")
  const [erroLogin, setErroLogin] = useState<String | null>(null);
  const [module, setModule] = useState<'signIn'|'signUp'>('signIn')

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
    const [emailCadastro, setEmailCadastro] = useState<String | null>("");
    const [nomeCadastro, setNomeCadastro] = useState<String | null>("");
    const [senhaCadastro, setSenhaCadastro] = useState<String | null>("");
  
    const criarUsuario = async () => {
  
  
  
      try {
        const response = await fetch("http://localhost:8081/usuarios", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: emailCadastro,
            nome: nomeCadastro,
            senha: senhaCadastro,
            role: "operador"
          })
        })
  
      } catch (error) {
        console.log(error);
  
      }
    }

  const changeModule = () => {

    const status = module === 'signIn' ? 'signUp' : 'signIn'

    setModule(status)

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



  return module === 'signIn' ? (
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
              <p className="text-center text-red-600 text-lg">{erroLogin}</p>
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
              <span className="text-blue-500 cursor-pointer"
              onClick={changeModule}>
                Cadastre-se
              </span>
            </Typography>
          </Box>
        </Box>
      

    </>
  ) :
  (
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
                onChange={(e) => setNomeCadastro(e.target.value)}
                required
              />
              <TextField
                fullWidth
                id="email"
                type="email"
                label="Email"
                placeholder="Digite seu email"
                onChange={(e) => setEmailCadastro(e.target.value)}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                id="password"
                type="password"
                label="Senha"
                placeholder="Digite sua senha"
                onChange={(e) => setSenhaCadastro(e.target.value)}
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
              <span className="text-blue-500 cursor-pointer"
                onClick={changeModule}>
                  Faça login
              </span>
              
            </Typography>
          </Box>
        </Box>
  );
}
