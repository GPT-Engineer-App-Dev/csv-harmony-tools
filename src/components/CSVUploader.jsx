import React from 'react';
import Papa from 'papaparse';
import { Button } from "@/components/ui/button";

const CSVUploader = ({ onFileUpload }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      complete: (result) => {
        const headers = result.data[0];
        const data = result.data.slice(1).map(row => 
          headers.reduce((acc, header, index) => {
            acc[header] = row[index];
            return acc;
          }, {})
        );
        onFileUpload(data, headers);
      },
      header: false,
    });
  };

  return (
    <div className="mb-4">
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="hidden"
        id="csv-file-input"
      />
      <label htmlFor="csv-file-input">
        <Button as="span">Upload CSV</Button>
      </label>
    </div>
  );
};

export default CSVUploader;