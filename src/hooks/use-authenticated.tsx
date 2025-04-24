import { createClient } from "@/lib/supabase/client";
import { Profile } from "@/lib/types";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function useAuthenticated() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = async () => {
      const client = createClient();
      const { data, error } = await client.auth.getUser();

      if (error) {
        navigate("/login");
      } else {
        const { data: profile, error: profileError } = await client
          .from("profiles")
          .select("*")
          .eq("id", data.user.id)
          .single();
        if (profileError) {
          console.error("Error fetching profile:", profileError);
        } else {
          setProfile(profile);
          setUser(data.user);
        }
      }
    };
    checkAuth();
  }, [navigate]);
  return { user, profile };
}
