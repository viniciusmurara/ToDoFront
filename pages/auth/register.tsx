import React from "react";
import Input from "../../components/input"

export default function Register() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">Cadastro</h1>
        <form>
          {/* Utilizando o componente Input */}
          <Input
            id="name"
            type="text"
            label="Nome Completo"
            placeholder="Digite seu nome completo"
            required
          />
          <Input
            id="email"
            type="email"
            label="Email"
            placeholder="Digite seu email"
            required
          />
          <Input
            id="password"
            type="password"
            label="Senha"
            placeholder="Digite sua senha"
            required
          />
          <Input
            id="confirm-password"
            type="password"
            label="Confirmar Senha"
            placeholder="Confirme sua senha"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Cadastrar
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Já tem uma conta?{" "}
          <a href="/auth/login" className="text-blue-500 hover:underline">
            Faça login
          </a>
        </p>
      </div>
    </div>
  );
}
