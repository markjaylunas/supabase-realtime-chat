import useAuthenticated from "@/hooks/use-authenticated";

export default function ChatPage() {
  const { user, profile } = useAuthenticated();
  if (!user) return null;
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <h1 className="text-2xl font-bold mb-4">Chat Page</h1>
      <p>{JSON.stringify({ profile }, null, 2)}</p>
      <p>{JSON.stringify({ user }, null, 2)}</p>
      <p className="text-muted-foreground mb-4">
        Chat functionality coming soon...
      </p>
    </div>
  );
}
