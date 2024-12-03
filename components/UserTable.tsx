import { useState } from "react";

type User = {
  id: number;
  nome: string;
  email: string;
  role: string;
};

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);

  const toggleDropdown = (id: number | null) => {
    setDropdownOpen(id);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead className=" text-black">
          <tr>
            <th className="px-4 py-2 border ">ID</th>
            <th className="px-4 py-2 border">Nome</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Papel</th>
            <th className="px-4 py-2 border">Ação</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center border-b">
              <td className="px-4 py-2">{user.id}</td>
              <td className="px-4 py-2">{user.nome}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2 relative">
                <button
                  className={`px-2 py-1 rounded ${
                    user.role === "ADMIN"
                      ? "bg-green-500 text-white"
                      : "bg-blue-500 text-white"
                  }`}
                  onClick={() => toggleDropdown(user.id)}
                >
                  {user.role}
                </button>
              </td>
              <td className="px-4 py-2 flex justify-center gap-2">
                <button
                  className="p-2 text-gray-900 border border-black rounded-md"
                  onClick={() => onEdit(user)}
                >
                  ✏️ Editar
                </button>
                <button
                  className="p-2 text-gray-900 border border-black rounded-md"
                  onClick={() => onDelete(user.id)}
                >
                  🗑️ Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
