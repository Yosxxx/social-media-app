// components/ImageUpload.tsx
"use client";

import { useState } from "react";
import { useUploadThing } from "@/utils/uploadthing"; // ← now available
import { XIcon } from "lucide-react";

interface ImageUploadProps {
  onChange: (url: string, key: string) => void;
  value: string;
  endpoint: "postImage";
}

export default function ImageUpload({
  endpoint,
  onChange,
  value,
}: ImageUploadProps) {
  const [loading, setLoading] = useState(false);
  const { startUpload } = useUploadThing(endpoint);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const uploaded = (await startUpload([file])) ?? [];
      const first = uploaded[0];
      // startUpload returns { fileUrl, fileKey }
      if (first?.ufsUrl && first?.key) {
        onChange(first.ufsUrl, first.key);
      }
    } finally {
      setLoading(false);
    }
  };

  if (value) {
    return (
      <div className="relative w-full h-80 rounded-2xl overflow-hidden">
        <img
          src={value}
          alt="Upload preview"
          className="object-cover w-full h-full"
        />
        <button
          type="button"
          onClick={() => onChange("", "")}
          className="absolute top-2 right-2 p-1 bg-black/60 rounded-full"
        >
          <XIcon className="h-4 w-4 text-white" />
        </button>
      </div>
    );
  }

  return (
    <label className="w-full h-80 flex flex-col items-center justify-center p-8 space-y-4 border-2 border-dashed border-gray-600 rounded-2xl cursor-pointer">
      {loading ? (
        <p>Uploading…</p>
      ) : (
        <>
          <p className="font-medium">Click or drag to select an image</p>
          <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10 MB</p>
        </>
      )}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />
    </label>
  );
}
