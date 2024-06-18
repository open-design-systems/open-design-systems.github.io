import React, { useState, DragEvent } from "react";

interface DraggableAreaProps {
  onFileUpload: (file: File) => void;
}

const DraggableArea = ({
  onFileUpload,
  children,
}: React.PropsWithChildren<DraggableAreaProps>) => {
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      onFileUpload(event.dataTransfer.files[0]);
      event.dataTransfer.clearData();
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="relative"
    >
      <div
        className={`absolute inset-0 invisible flex items-center justify-center transition-opacity duration-300 ${
          dragOver ? "opacity-100 visible" : "opacity-0"
        }`}
      >
        <CloudUploadIcon className="h-12 w-12 text-gray-500" />
      </div>
      <div
        className={`transition-opacity duration-300 ${
          dragOver
            ? "opacity-60 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-md"
            : "opacity-100"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default DraggableArea;

function CloudUploadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M12 12v9" />
      <path d="m16 16-4-4-4 4" />
    </svg>
  );
}
