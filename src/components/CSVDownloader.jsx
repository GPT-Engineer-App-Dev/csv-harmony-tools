import React from 'react';
import Papa from 'papaparse';
import { Button } from "@/components/ui/button";

const CSVDownloader = ({ data, headers }) => {
  const handleDownload = () => {
    const csv = Papa.unparse({
      fields: headers,
      data: data.map(row => headers.map(header => row[header])),
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'exported_data.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Button onClick={handleDownload} className="mt-4">Download CSV</Button>
  );
};

export default CSVDownloader;