import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./Layout";
import { HomePage } from "./pages/HomePage";
import { ThemeProvider } from "./lib/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="zoosino-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route
              path="rulette"
              element={<h1>Rulette is under construction</h1>}
            />
            <Route path="profile" element={<h1>User profile</h1>} />
            <Route path="*" element={<h1>404 - Site not found :( </h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;