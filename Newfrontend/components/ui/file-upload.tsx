"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { File, UploadCloud } from "lucide-react";

interface FileUploadProps {
  accept?: string;
  onChange: (file: File) => void;
}

export function FileUpload({ accept = "*", onChange }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
        onChange(acceptedFiles[0]);
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept ? { [accept]: [] } : undefined,
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer ${
        isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
      }`}
    >
      <input {...getInputProps()} />
      {file ? (
        <div className="flex items-center justify-center space-x-2">
          <File className="h-5 w-5 text-gray-500" />
          <span className="text-sm">{file.name}</span>
        </div>
      ) : (
        <div className="space-y-2">
          <UploadCloud className="mx-auto h-8 w-8 text-gray-400" />
          <p className="text-sm text-gray-600">
            {isDragActive
              ? "Drop the file here"
              : "Drag & drop a file or click to select"}
          </p>
          <p className="text-xs text-gray-500">Max file size: 5MB</p>
          <Button type="button" variant="outline" size="sm" className="mt-2">
            Select File
          </Button>
        </div>
      )}
    </div>
  );
}