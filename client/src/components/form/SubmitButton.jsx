import React from 'react';

const SubmitButton = ({ label }) => {
  return (
    <button type="submit" className="w-full bg-purple-700 text-white px-4 py-2 rounded">
      {label}
    </button>
  );
};

export default SubmitButton;
