import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";
import { Profile } from "@/lib/types";
import { Upload, User } from "lucide-react";
import { useCallback, useState } from "react";

interface AvatarUploadProps {
  profile: Profile | null;
  onUploadComplete: (url: string) => void;
}

export function AvatarUpload({ profile, onUploadComplete }: AvatarUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || "");

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }

      setIsUploading(true);
      setError(null);

      try {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${profile?.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("avatars")
          .getPublicUrl(filePath);
        onUploadComplete(data.publicUrl);
        setAvatarUrl(data.publicUrl);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Error uploading file"
        );
      } finally {
        setIsUploading(false);
      }
    },
    [profile?.id, onUploadComplete]
  );

  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar className="h-24 w-24">
        <AvatarImage src={avatarUrl} alt={profile?.full_name || ""} />
        <AvatarFallback>
          {profile?.full_name ? (
            <p className="text-4xl font-bold">
              {getInitials(profile.full_name)}
            </p>
          ) : (
            <User className="h-8 w-8" />
          )}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-center gap-2">
        <Button variant="outline" className="relative" disabled={isUploading}>
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileChange}
            accept="image/*"
          />
          <Upload className="mr-2 h-4 w-4" />
          {isUploading ? "Uploading..." : "Upload Avatar"}
        </Button>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
}
