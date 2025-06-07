// components/ImageUpload.tsx
"use client";

import { UploadDropzone } from "@/utils/uploadthing";
import { XIcon } from "lucide-react";

interface ImageUploadProps {
  onChange: (url: string) => void;
  value: string;
  endpoint: "postImage";
}

export default function ImageUpload({
  endpoint,
  onChange,
  value,
}: ImageUploadProps) {
  // if an image is already chosen, show a preview + “X” button
  if (value) {
    return (
      <div className="relative w-full h-80 rounded-2xl overflow-hidden">
        <img
          src={value}
          alt="Upload preview"
          className="object-cover w-full h-full"
        />
        <button
          onClick={() => onChange("")}
          className="absolute top-2 right-2 p-1 bg-black/60 rounded-full"
          type="button"
        >
          <XIcon className="h-4 w-4 text-white" />
        </button>
      </div>
    );
  }

  // otherwise render the big dashed dropzone
  return (
    <div className="w-full h-80  flex flex-col items-center justify-center text-center p-8 space-y-4">
      {/* You can also pass className directly into UploadDropzone if it supports it */}
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(files) => {
          const f = files?.[0];
          if (f) onChange(f.ufsUrl);
        }}
        onUploadError={(err) => console.error(err)}
        className="h-80 rounded-2xl border-2 border-dashed border-gray-600 flex items-center justify-center"
      >
        {/* Children here if UploadDropzone supports custom inner UI */}
      </UploadDropzone>
    </div>
  );
}
