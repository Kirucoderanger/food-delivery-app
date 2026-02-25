/*import { UploadButton } from "@uploadthing/react";

export default function ImageUploader({ onUpload }) {
  return (
    <UploadButton
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        onUpload(res[0].url);
      }}
      onUploadError={(error) => {
        alert(`Upload failed: ${error.message}`);
      }}
    />
  );
}
*/
/*

import { useState } from "react";

const ImageUploader = ({ onUploadComplete }) => {
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setUploading(true);

    const formData = new FormData();
    formData.append("files", file);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/uploadthing?slug=imageUploader`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      const imageUrl = data[0].url;

      onUploadComplete(imageUrl);
    } catch (err) {
      console.error(err);
    }

    setUploading(false);
  };

  return (
    <div className="space-y-2">
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="w-full border p-2 rounded"
      />

      {uploading && (
        <p className="text-sm text-orange-500">
          Uploading image...
        </p>
      )}

      {preview && (
        <img
          src={preview}
          alt="preview"
          className="w-full h-40 object-cover rounded"
        />
      )}
    </div>
  );
};

export default ImageUploader;
*/


import { useState } from "react";

const ImageUploader = ({ onUploadComplete, existingImage }) => {
  const [preview, setPreview] = useState(existingImage || "");
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setUploading(true);

    const formData = new FormData();
    formData.append("files", file);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_UPLOADTHING_URL}/api/uploadthing?slug=imageUploader`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      const imageUrl = data[0].url;

      onUploadComplete(imageUrl);
    } catch (err) {
      console.error("Upload error:", err);
    }

    setUploading(false);
  };

  return (
    <div className="space-y-2">
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleUpload}
        className="w-full border p-2 rounded"
      />

      {uploading && (
        <p className="text-sm text-orange-500">
          Uploading image...
        </p>
      )}

      {preview && (
        <img
          src={preview}
          alt="preview"
          className="w-full h-40 object-cover rounded"
        />
      )}
    </div>
  );
};

export default ImageUploader;