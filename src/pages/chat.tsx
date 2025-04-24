import useAuthenticated from "@/hooks/use-authenticated";
import { UserAvatar } from "@/components/user-avatar";

export default function ChatPage() {
  const { user, profile } = useAuthenticated();
  if (!user) return null;
  return (
    <div className="flex flex-col min-h-svh">
      <header className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="ml-auto flex items-center space-x-4">
            <UserAvatar profile={profile} />
          </div>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Chat Page</h1>
        <p className="text-muted-foreground mb-4">
          Chat functionality coming soon...
        </p>
      </main>
    </div>
  );
}
