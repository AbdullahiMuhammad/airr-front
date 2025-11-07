import React, { useState } from "react";

const FileUploadField = ({ label = "Upload Files", onChange, accept }) => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    if (onChange) onChange(updatedFiles);
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    if (onChange) onChange(updatedFiles);
  };

  return (
    <div className="flex flex-col p-2 h-auto rounded gap-3  border border-gray-200 w-full">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}

      <input
        type="file"
        multiple
        accept={accept}
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-900 border p-2 h-[50px] border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700"
      />

      {files.length > 0 && (
        <ul className="flex flex-wrap gap-3 mt-2">
          {files.map((file, index) => (
            <li
              key={index}
              className="flex items-center gap-3 bg-gray-100 p-2 rounded-md shadow-sm"
            >
              {file.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-12 h-12 object-cover rounded-md"
                />
              ) : (
                <span className="text-sm text-gray-800">{file.name}</span>
              )}

              <button
                type="button"
                onClick={() => handleRemoveFile(index)}
                className="ml-auto p-2 text-red-500 hover:text-red-700 text-lg"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileUploadField;
