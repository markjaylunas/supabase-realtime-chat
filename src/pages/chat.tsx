import { RealtimeChat } from "@/components/realtime-chat";
import { UserAvatar } from "@/components/user-avatar";
import { Brand } from "@/components/brand";
import useAuthenticated from "@/hooks/use-authenticated";

export default function ChatPage() {
  const { user, profile } = useAuthenticated();

  if (!user || !profile) return null;
  return (
    <div className="flex flex-col h-svh">
      <header className="border-b fixed top-0 left-0 right-0 bg-background z-10">
        <div className="flex h-16 items-center px-4 max-w-3xl mx-auto">
          <Brand />

          <div className="ml-auto flex items-center space-x-4">
            <UserAvatar profile={profile} />
          </div>
        </div>
      </header>
      <main className="flex-1 flex flex-col max-w-3xl w-full mx-auto pt-16">
        <RealtimeChat roomName="global-chat" />
      </main>
    </div>
  );
}
