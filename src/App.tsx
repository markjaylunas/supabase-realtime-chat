import { ThemeProvider } from "@/providers/theme-provider";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { ForgotPasswordForm } from "./components/forgot-password-form";
import { LoginForm } from "./components/login-form";
import { SignUpForm } from "./components/sign-up-form";
import { UpdatePasswordForm } from "./components/update-password-form";
import ChatPage from "./pages/chat";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
          <Route path="/update-password" element={<UpdatePasswordForm />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
