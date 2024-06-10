// src/components/JobList.jsx
import React from 'react';

const JobList = () => {
  const jobs = [
    { company: 'Gojek', title: 'Senior - Product Designer', location: 'Jakarta - Indonesia', category: 'Design', daysAgo: 3 },
    { company: 'Tokopedia', title: 'Project Manager', location: 'Jakarta - Indonesia', category: 'Product', daysAgo: 4 },
    { company: 'Dropbox', title: 'Senior - Software Engineer', location: 'Anywhere - Remote', category: 'Engineer', daysAgo: 5 },
  ];

  return (
    <div className="py-10 px-8">
      <h2 className="text-2xl font-bold mb-6">Most Recent Searches</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {jobs.map((job, index) => (
          <div key={index} className="bg-white p-6 rounded shadow-md">
            <div className="flex justify-between items-center mb-4">
              <div className="text-lg font-bold">{job.company}</div>
              <div className="text-sm text-gray-500">{job.daysAgo} days ago</div>
            </div>
            <div className="text-xl text-gray-800 mb-2">{job.title}</div>
            <div className="text-gray-600 mb-4">{job.location}</div>
            <div className="text-sm bg-purple-100 text-purple-700 px-2 py-1 rounded">{job.category}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
