import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table } from "@/components/ui/table";
import CSVUploader from './CSVUploader';
import CSVTable from './CSVTable';
import CSVDownloader from './CSVDownloader';

const CSVEditor = () => {
  const [csvData, setCsvData] = useState([]);
  const [headers, setHeaders] = useState([]);

  const handleFileUpload = (data, headers) => {
    setCsvData(data);
    setHeaders(headers);
  };

  const handleRowEdit = (index, updatedRow) => {
    const newData = [...csvData];
    newData[index] = updatedRow;
    setCsvData(newData);
  };

  const handleRowAdd = () => {
    const newRow = headers.reduce((acc, header) => ({ ...acc, [header]: '' }), {});
    setCsvData([...csvData, newRow]);
  };

  const handleRowDelete = (index) => {
    const newData = csvData.filter((_, i) => i !== index);
    setCsvData(newData);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">CSV Editor</h1>
      <CSVUploader onFileUpload={handleFileUpload} />
      {csvData.length > 0 && (
        <>
          <CSVTable
            data={csvData}
            headers={headers}
            onRowEdit={handleRowEdit}
            onRowDelete={handleRowDelete}
          />
          <Button onClick={handleRowAdd} className="mt-4">Add New Row</Button>
          <CSVDownloader data={csvData} headers={headers} />
        </>
      )}
    </div>
  );
};

export default CSVEditor;