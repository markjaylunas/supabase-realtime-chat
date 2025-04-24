import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/providers/theme-provider";
import { ModeToggle } from "./components/ui/toggle-mode";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-col items-center justify-center min-h-svh">
        <Button>Click me</Button>
        <ModeToggle />
      </div>
    </ThemeProvider>
  );
}

export default App;
