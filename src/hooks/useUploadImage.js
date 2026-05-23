import { useState } from "react";
import { uploadImage } from "../services/uploadService";

export function useUploadImage() {
  const [uploading, setUploading] = useState(false);

  const upload = async (file, userId) => {
    setUploading(true);
    try {
      return await uploadImage(file, userId);
    } finally {
      setUploading(false);
    }
  };

  return { upload, uploading };
}
