// src/components/SearchBar.jsx
import React from 'react';

const SearchBar = () => {
  return (
    <div className="flex flex-col items-center py-20 bg-gradient-to-r from-purple-300 to-pink-300">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Find the most exciting remote-friendly jobs</h1>
      <p className="text-gray-600 mb-8">Jobsek is our love letter to find remote or onsite work - with 45,000+ Jobs. Unlock your new career working from anywhere in the world.</p>
      <div className="flex space-x-4 bg-white p-4 rounded shadow-md">
        <input type="text" placeholder="Job title or keyword" className="px-4 py-2 border border-gray-300 rounded-l" />
        <input type="text" placeholder="Anywhere" className="px-4 py-2 border-t border border-gray-300" />
        <button className="bg-purple-700 text-white px-6 py-2 rounded">Search</button>
      </div>
    </div>
  );
};

export default SearchBar;
