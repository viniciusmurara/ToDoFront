import React from "react";

interface InputProps {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({ id, type, label, placeholder, required = false }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-600">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};

export default Input;