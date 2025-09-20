import { useEffect, useState } from "react";

export default function useFilePreview(file?: File | null) {
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  useEffect(() => {
    // If no valid file, clear preview
    if (!file || !(file instanceof Blob)) {
      setImgSrc(null);
      return;
    }

    // Create object URL
    const url = URL.createObjectURL(file);
    setImgSrc(url);

    // Cleanup on unmount or when file changes
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  return imgSrc;
}
