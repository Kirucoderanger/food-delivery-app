import { UploadButton } from "@uploadthing/react";

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
