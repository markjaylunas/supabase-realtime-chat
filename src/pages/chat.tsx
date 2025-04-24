import { RealtimeChat } from "@/components/realtime-chat";
import { UserAvatar } from "@/components/user-avatar";
import useAuthenticated from "@/hooks/use-authenticated";
import { Link } from "react-router-dom";

export default function ChatPage() {
  const { user, profile } = useAuthenticated();

  if (!user || !profile) return null;
  return (
    <div className="container mx-auto max-w-3xl flex flex-col min-h-svh">
      <header className="border-b">
        <div className="flex h-16 items-center px-4">
          <h1 className="text-lg font-bold">
            Realtime Chat <span className="text-muted-foreground">by</span>{" "}
            <Link
              to="https://makje.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline font-normal text-muted-foreground"
            >
              Mark Jay Lunas | Makje
            </Link>
          </h1>

          <div className="ml-auto flex items-center space-x-4">
            <UserAvatar profile={profile} />
          </div>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <RealtimeChat
          roomName="global-chat"
          username={profile.full_name || user.email || profile.id}
        />
      </main>
    </div>
  );
}
