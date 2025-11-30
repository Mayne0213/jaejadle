"use client";

import React from "react";
import Image from "next/image";
import { X, Upload, Image as ImageIcon, FileText, File as FileIcon } from "lucide-react";

export interface PendingFile {
  file: File;
  preview?: string;
}

interface FileUploadProps {
  files: PendingFile[];
  onFilesChange: (files: PendingFile[]) => void;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  label?: string;
  required?: boolean;
  description?: string;
  showImagePreview?: boolean;
  maxSizeMB?: number;
}

export default function FileUpload({
  files,
  onFilesChange,
  accept,
  multiple = true,
  disabled = false,
  label = "파일 첨부",
  required = false,
  description = "이미지, PDF, 문서 등 모든 파일 형식 지원",
  showImagePreview = false,
  maxSizeMB,
}: FileUploadProps) {
  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) {
      return ImageIcon;
    } else if (fileType.includes("pdf")) {
      return FileText;
    } else {
      return FileIcon;
    }
  };

  const isImage = (fileType: string) => {
    return fileType.startsWith("image/");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    let newFiles = Array.from(selectedFiles);

    // 파일 크기 검사
    if (maxSizeMB) {
      const maxSize = maxSizeMB * 1024 * 1024;
      const oversizedFiles = newFiles.filter((f) => f.size > maxSize);
      if (oversizedFiles.length > 0) {
        alert(
          `파일 크기는 ${maxSizeMB}MB를 초과할 수 없습니다: ${oversizedFiles.map((f) => f.name).join(", ")}`
        );
        newFiles = newFiles.filter((f) => f.size <= maxSize);
        if (newFiles.length === 0) return;
      }
    }

    const newPendingFiles: PendingFile[] = newFiles.map((file) => ({
      file,
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
    }));

    onFilesChange([...files, ...newPendingFiles]);

    // input 초기화
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    const file = files[index];
    if (file.preview) {
      URL.revokeObjectURL(file.preview);
    }
    onFilesChange(files.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          disabled={disabled}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
          <Upload className="w-12 h-12 text-gray-400 mb-3" />
          <p className="text-gray-600 mb-1">클릭하여 파일을 선택하세요</p>
          <p className="text-sm text-gray-500">{description}</p>
        </label>
      </div>

      {/* 파일 목록 */}
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-sm font-medium text-gray-700">
            선택된 파일 ({files.length})
          </p>

          {/* 이미지 미리보기 그리드 */}
          {showImagePreview ? (
            <div className="grid grid-cols-3 gap-2">
              {files.map((pf, index) => (
                <div key={index} className="relative aspect-square">
                  {pf.preview ? (
                    <Image
                      src={pf.preview}
                      alt={`Preview ${index + 1}`}
                      fill
                      className="object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                      <FileIcon className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            /* 파일 리스트 */
            <div className="space-y-2">
              {files.map((pf, index) => {
                const FileIconComponent = getFileIcon(pf.file.type);
                return (
                  <div
                    key={index}
                    className="relative group border rounded-lg p-3 hover:shadow-md transition-shadow flex items-center gap-3"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                        {isImage(pf.file.type) ? (
                          <ImageIcon className="w-6 h-6 text-blue-500" />
                        ) : (
                          <FileIconComponent className="w-6 h-6 text-gray-500" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {pf.file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(pf.file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="flex-shrink-0 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
