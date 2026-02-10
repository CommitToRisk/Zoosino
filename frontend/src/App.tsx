import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./Layout";
import { HomePage } from "./pages/HomePage";
import { ThemeProvider } from "./lib/theme-provider";
import { AuthProvider } from "./lib/auth";
import { LoginPage } from "./pages/LoginPage";
import { AccountPage } from "./pages/AccountPage";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="zoosino-ui-theme">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="login" element={<LoginPage />} />
              <Route
                path="rulette"
                element={<h1>Rulette is under construction</h1>}
              />
              <Route path="account" element={<AccountPage/>} />
              <Route path="*" element={<h1>404 - Site not found :( </h1>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;