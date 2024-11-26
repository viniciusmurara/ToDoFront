export default function register() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">Cadastro</h1>
                <form>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                            Nome Completo
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Digite seu nome completo"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Digite seu email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                            Senha
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Digite sua senha"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-600">
                            Confirmar Senha
                        </label>
                        <input
                            type="password"
                            id="confirm-password"
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Confirme sua senha"
                            required
                        />
                    </div>
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
