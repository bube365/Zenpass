import { Upload, X, Loader2 } from "lucide-react";
import { useState } from "react";
import { useUploadDocumentMutation } from "../../store/api/authApi";
import { useSelector } from "react-redux";

export default function FileUpload({
  label,
  description,
  accept,
  maxSize,
  name,
  documentType,
  onChange,
  error,
  fileUrl, // 👈 add this
  docName,
}) {
  const [fileName, setFileName] = useState(
    fileUrl ? fileUrl.split("/").pop() : null
  );
  const [isDragging, setIsDragging] = useState(false);
  const [uploadDocument, { isLoading }] = useUploadDocumentMutation();

  const uploadFile = async (file) => {
    try {
      const response = await uploadDocument({ file, documentType }).unwrap();
      setFileName(file.name);
      onChange && onChange(response.fileUrl || file);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Error uploading file. Please try again.");
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (maxSize && file.size > maxSize * 1024 * 1024) {
      alert(`File size must be less than ${maxSize}MB`);
      return;
    }
    await uploadFile(file);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    if (maxSize && file.size > maxSize * 1024 * 1024) {
      alert(`File size must be less than ${maxSize}MB`);
      return;
    }
    await uploadFile(file);
  };

  const handleClear = () => {
    setFileName(null);
    onChange && onChange(null);
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-900 mb-2">
          {label}
        </label>
      )}

      {!fileName ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer ${
            isDragging
              ? "border-red-400 bg-red-50"
              : "border-gray-300 bg-gray-50"
          } ${error ? "border-red-500" : ""}`}
        >
          <input
            type="file"
            name={name}
            accept={accept}
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isLoading}
          />
          {isLoading ? (
            <div className="flex flex-col items-center space-y-3">
              <Loader2 className="animate-spin text-red-500" size={24} />
              <p className="text-sm font-medium text-gray-700">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-3">
              <Upload className="text-red-500" size={24} />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Click to upload {label?.toLowerCase()}
                </p>
                {description && (
                  <p className="text-xs text-gray-500">{description}</p>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg transition-all">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Upload className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {docName ? docName : fileName}
              </p>
              {fileUrl ? (
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-500 underline"
                >
                  View uploaded document
                </a>
              ) : (
                <p className="text-xs text-gray-500">
                  File uploaded successfully
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={handleClear}
            className="w-8 h-8 flex items-center justify-center hover:bg-green-100 rounded-full transition-colors"
          >
            <X size={18} className="text-gray-600" />
          </button>
        </div>
      )}

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
