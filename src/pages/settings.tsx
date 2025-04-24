import { AvatarUpload } from "@/components/avatar-upload";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MainHeader } from "@/components/main-header";
import useAuthenticated from "@/hooks/use-authenticated";
import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SettingsPage() {
  const { user, profile } = useAuthenticated();
  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Initialize form values when profile is loaded
  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || "");
      setAvatarUrl(profile.avatar_url || "");
    }
  }, [profile]);

  if (!user || !profile) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          avatar_url: avatarUrl || profile.avatar_url, // Preserve existing avatar URL if not changed
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) throw error;
      setSuccess(true);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarUpload = (url: string) => {
    setAvatarUrl(url);
  };

  return (
    <div className="flex flex-col h-svh">
      <MainHeader />
      <main className="flex-1 flex flex-col max-w-3xl w-full mx-auto pt-16">
        <div className="container mx-auto max-w-xl flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Settings</CardTitle>
              <CardDescription>
                Manage your account settings and profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="full-name">Full Name</Label>
                    <Input
                      id="full-name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Avatar</Label>
                    <AvatarUpload
                      profile={profile}
                      onUploadComplete={handleAvatarUpload}
                    />
                  </div>
                  {error && <p className="text-sm text-red-500">{error}</p>}
                  {success && (
                    <p className="text-sm text-green-500">
                      Settings updated successfully!
                    </p>
                  )}
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
