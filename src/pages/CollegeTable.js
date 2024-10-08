import React from 'react';
import PropTypes from 'prop-types';
import CTAButton from "../components/core/HomePage/CTAButton"
import {Link} from "react-router-dom"

function CollegeTable({ collegeData, category }) {
  return (
    <div className="p-4 mt-9">
      {collegeData.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b text-left text-gray-600">Sr. No.</th>
              <th className="px-4 py-2 border-b text-left text-gray-600">College Name</th>
              <th className="px-4 py-2 border-b text-left text-gray-600">Branch</th>
              <th className="px-4 py-2 border-b text-left text-gray-600">Category</th>
              <th className="px-4 py-2 border-b text-left text-gray-600">Cutoff Percentile</th>
            </tr>
          </thead>
          <tbody>
            {collegeData.map((college, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="px-4 py-2 border-b text-gray-700">{index+1}</td>
                <td className="px-4 py-2 border-b text-gray-700">{college.CollegeName}</td>
                <td className="px-4 py-2 border-b text-gray-700">{college.Branch}</td>
                <td className="px-4 py-2 border-b text-gray-700">{category}</td>
                <td className="px-4 py-2 border-b text-gray-700">{college[category] ? college[category] : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
      ) : (
        <p className="text-center text-gray-600 mt-4">No college data available.</p>
      )}

      
      
    </div>
  );
}

// Define prop types
CollegeTable.propTypes = {
  collegeData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      branch: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      cutoff_percentile: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CollegeTable;
