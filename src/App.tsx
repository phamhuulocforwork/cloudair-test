import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Puck } from "@measured/puck";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { config } from "./puck/config";
import { PreviewPage } from "./pages/PreviewPage";
import "@measured/puck/puck.css";

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

const initialData = {
  content: [],
  root: {
    props: {
      title: "CloudAir Test",
    },
  },
};

const EditorPage = () => {
  const handlePublish = (data: any) => {
    localStorage.setItem("puck-data", JSON.stringify(data));
  };

  return (
    <div style={{ height: "100vh" }}>
      <Puck config={config} data={initialData} onPublish={handlePublish} />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<EditorPage />} />
          <Route path="/preview" element={<PreviewPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
