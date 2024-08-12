import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CSVTable = ({ data, headers, onRowEdit, onRowDelete }) => {
  const [editingRow, setEditingRow] = useState(null);
  const [editedData, setEditedData] = useState({});

  const handleEdit = (index) => {
    setEditingRow(index);
    setEditedData(data[index]);
  };

  const handleSave = () => {
    onRowEdit(editingRow, editedData);
    setEditingRow(null);
    setEditedData({});
  };

  const handleCancel = () => {
    setEditingRow(null);
    setEditedData({});
  };

  const handleInputChange = (header, value) => {
    setEditedData({ ...editedData, [header]: value });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {headers.map((header) => (
            <TableHead key={header}>{header}</TableHead>
          ))}
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            {headers.map((header) => (
              <TableCell key={header}>
                {editingRow === index ? (
                  <Input
                    value={editedData[header] || ''}
                    onChange={(e) => handleInputChange(header, e.target.value)}
                  />
                ) : (
                  row[header]
                )}
              </TableCell>
            ))}
            <TableCell>
              {editingRow === index ? (
                <>
                  <Button onClick={handleSave} className="mr-2">Save</Button>
                  <Button onClick={handleCancel} variant="outline">Cancel</Button>
                </>
              ) : (
                <>
                  <Button onClick={() => handleEdit(index)} className="mr-2">Edit</Button>
                  <Button onClick={() => onRowDelete(index)} variant="destructive">Delete</Button>
                </>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CSVTable;