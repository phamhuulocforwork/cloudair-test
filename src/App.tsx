import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Puck } from "@measured/puck";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { config } from "./puck/config";
import { PreviewPage } from "./pages/PreviewPage";
import "@measured/puck/puck.css";
import { Box, Stack, Typography } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

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

const EditorPage = () => {
  const handlePublish = (data: any) => {
    localStorage.setItem("puck-data", JSON.stringify(data));
  };

  return (
    <div style={{ height: "100vh" }}>
      <Puck config={config} data={initialData} onPublish={handlePublish}>
        <Stack direction="row" spacing={0} width="100%" height="100vh">
          <Stack
            sx={{
              width: 280,
              flexShrink: 0,
              overflow: "auto",
              height: "100vh",
              borderRight: "1px solid #E2E8F0",
              padding: 3,
              backgroundColor: "#ffffff",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: "#0f172a",
              }}
            >
              Thành phần
            </Typography>
            <Puck.Components />
          </Stack>
          <Stack
            sx={{
              flexGrow: 1,
              minWidth: 0,
              overflowY: "hidden",
              height: "100vh",
              background:
                "radial-gradient(1000px 500px at 100% 0%, #eafdfd 0%, transparent 55%), #f8fafc",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#ffffff",
                borderBottom: "1px solid #E2E8F0",
                px: 3,
                py: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
              }}
            >
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: "#0f172a",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Soạn thảo Form
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#64748b",
                    mt: 0.5,
                  }}
                >
                  Kéo thả các thành phần từ sidebar để tạo form
                </Typography>
              </Box>
            </Box>

            <Stack height="100%" overflow="auto" padding={3} boxSizing="border-box">
              <Puck.Preview />
            </Stack>
          </Stack>
        </Stack>
      </Puck>
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
