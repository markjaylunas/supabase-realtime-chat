import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/providers/theme-provider";
import { ModeToggle } from "./components/ui/toggle-mode";
import { LoginForm } from "./components/login-form";
import { SignUpForm } from "./components/sign-up-form";
import { ForgotPasswordForm } from "./components/forgot-password-form";
import { UpdatePasswordForm } from "./components/update-password-form";
import ChatPage from "./pages/chat";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <div className="min-h-svh">
          <div className="absolute top-4 right-4">
            <ModeToggle />
          </div>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/forgot-password" element={<ForgotPasswordForm />} />
            <Route path="/update-password" element={<UpdatePasswordForm />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
