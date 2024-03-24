import { CldUploadWidget } from "next-cloudinary";
import { Plus, Trash } from "lucide-react";

import { Button } from "../ui/button";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
}) => {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-4">
        {value && (
          <div
            key={value}
            className="relative w-[300px] h-[400px] rounded-lg border-2"
          >
            <div className="absolute top-0 right-0 z-10">
              <Button
                type="button"
                onClick={() => onRemove(value)}
                size="sm"
                className="bg-red-1 text-white"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              src={value}
              alt="coverNovel"
              className="object-cover rounded-lg"
              fill
            />
          </div>
        )}
      </div>
      {!value && (
        <CldUploadWidget
          uploadPreset="covers"
          onUpload={onUpload}
          options={{
            clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
            cropping: true,
            croppingAspectRatio: 3 / 4,
            showSkipCropButton: false,
          }}
        >
          {({ open }) => {
            return (
              <Button
                type="button"
                onClick={() => open()}
                className="bg-grey-2 text-green-700 w-[300px] h-[400px] rounded-lg border-2"
              >
                <Plus className="h-4 w-4 mr-2" />
                Chọn ảnh
              </Button>
            );
          }}
        </CldUploadWidget>
      )}
    </div>
  );
};

export default ImageUpload;
