import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface UploadWidgetProps {
  onUploadSuccess: (result: any) => void;
}

const uploadOptions = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  uploadPreset: "ecommerce",
  sources: ["local", "camera"] as ("local" | "camera")[],
  multiple: false,
  maxFiles: 1,
  clientAllowedFormats: ["image"],
  allowedFormats: ["jpg", "png", "gif"],
};

const UploadWidget: React.FC<UploadWidgetProps> = ({ onUploadSuccess }) => {
  return (
    <CldUploadWidget
      uploadPreset={uploadOptions.uploadPreset}
      onUpload={onUploadSuccess}
      options={uploadOptions}
    >
      {({ open }) => (
        <Button
          type="button"
          variant="outline"
          onClick={() => open()}
          className="relative"
        >
          <Upload className="mr-2 h-4 w-4" /> Upload Images
        </Button>
      )}
    </CldUploadWidget>
  );
};

export default UploadWidget;
