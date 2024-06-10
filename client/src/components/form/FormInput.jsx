import React from 'react';

const FormInput = ({ id, label, type, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2" htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded"
        required
      />
    </div>
  );
};

export default FormInput;
