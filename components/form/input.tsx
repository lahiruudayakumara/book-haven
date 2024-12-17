import React from 'react';

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  name: string;
  required?: boolean;
  label?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder = '',
  type = 'text',
  name,
  required = false,
  label,
  className = '',
}) => (
  <div className={`relative ${className}`}>
    {label && (
      <label htmlFor={name} className="block dark:text-slate-200 text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
    )}
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      id={name}
      className="w-full px-4 py-2 border border-gray-300 dark:bg-gray-800 dark:text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
    />
  </div>
);

export default Input;
