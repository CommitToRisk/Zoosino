import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./Layout";
import { HomePage } from "./pages/HomePage";
import { ThemeProvider } from "./lib/theme-provider";
import { AuthProvider } from "./lib/auth";
import { LoginPage } from "./pages/LoginPage";
import { AccountPage } from "./pages/AccountPage";
import { RegisterPage } from "./pages/RegisterPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { TurtlettePage } from "./pages/TurtlettePage";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="zoosino-ui-theme">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="turtlette" element={<TurtlettePage />} />
              <Route path="account" element={<AccountPage/>} />
              <Route path="*" element={<NotFoundPage/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;