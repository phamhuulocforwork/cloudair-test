import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Puck } from "@measured/puck";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { config } from "./puck/config";
import { PreviewPage } from "./pages/PreviewPage";
import "@measured/puck/puck.css";

// MUI Theme setup
const theme = createTheme({
  palette: {
    mode: "light",
  },
});

// Initial data structure
const initialData = {
  content: [
    {
      type: "DropdownBlock",
      props: {
        id: "dropdown-1",
        label: "What is your favorite color?",
        options: [{ option: "Red" }, { option: "Blue" }, { option: "Green" }],
        defaultValue: "",
      },
    },
    {
      type: "RadioBlock",
      props: {
        id: "radio-1",
        label: "Select your preferred option:",
        options: [{ option: "Option A" }, { option: "Option B" }, { option: "Option C" }],
        defaultValue: "",
      },
    },
  ],
  root: {
    props: {
      title: "CloudAir Vite Demo",
    },
  },
};

// Editor page component
const EditorPage = () => {
  const handlePublish = (data: any) => {
    // Save to localStorage for demo purposes
    localStorage.setItem("puck-data", JSON.stringify(data));
    console.log("Published data:", data);

    // Show success message
    alert("Form saved! Click 'Preview' to see the result.");
  };

  return (
    <div style={{ height: "100vh" }}>
      <Puck
        config={config}
        data={initialData}
        onPublish={handlePublish}
        headerActions={
          <button
            onClick={() => window.open("/preview", "_blank")}
            style={{
              padding: "8px 16px",
              backgroundColor: "#1976d2",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              marginRight: "8px",
            }}
          >
            🔍 Preview
          </button>
        }
      />
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
