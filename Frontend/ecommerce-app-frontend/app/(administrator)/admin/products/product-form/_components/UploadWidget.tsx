import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface UploadWidgetProps {
  buttonName?: string;
  onUploadSuccess: (result: any) => void;
  options?: {
    cloudName?: string;
    uploadPreset?: string;
    sources?: ("local" | "camera")[];
    multiple?: boolean;
    maxFiles?: number;
    clientAllowedFormats?: string[];
    allowedFormats?: string[];
  };
}

const defaultOptions = {
  buttonName: "Upload Images",
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
  sources: ["local", "camera", "url"] as ("local" | "camera" | "url")[],
  multiple: false,
  maxFiles: 1,
  clientAllowedFormats: ["image"],
  allowedFormats: ["jpg", "png", "gif"],
};

function UploadWidget({
  onUploadSuccess,
  options = {},
  buttonName,
}: UploadWidgetProps) {
  const uploadOptions = { ...defaultOptions, ...options };

  return (
    <CldUploadWidget
      uploadPreset={uploadOptions.uploadPreset}
      onSuccess={onUploadSuccess}
      options={uploadOptions}
    >
      {({ open }) => (
        <Button
          type="button"
          variant="outline"
          onClick={() => open()}
          className="relative"
        >
          <Upload className="mr-2 h-4 w-4" />{" "}
          {buttonName || uploadOptions.buttonName}
        </Button>
      )}
    </CldUploadWidget>
  );
}

export default UploadWidget;
