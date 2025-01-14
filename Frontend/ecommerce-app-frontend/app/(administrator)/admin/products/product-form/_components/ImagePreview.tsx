import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import Image from "next/image";

interface ImagePreviewProps {
  src: string;
  alt: string;
  onDelete: () => void;
}

export default function ImagePreview({
  src,
  alt,
  onDelete,
}: ImagePreviewProps) {
  return (
    <div className="relative group">
      <Image
        src={src}
        alt={alt}
        width={500}
        height={600}
        className="w-full h-[200px] object-cover rounded-md"
      />
      <Button
        variant="destructive"
        size="icon"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={onDelete}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
}
