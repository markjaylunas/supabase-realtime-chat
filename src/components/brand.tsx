import { Link } from "react-router-dom";

export function Brand() {
  return (
    <h1 className="text-lg font-bold">
      Realtime Chat{" "}
      <span className="text-sm font-normal text-muted-foreground">
        by
      </span>{" "}
      <Link
        to="https://makje.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline text-sm font-normal text-muted-foreground"
      >
        Mark Jay Lunas | Makje
      </Link>
    </h1>
  );
} 