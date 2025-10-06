import { Render } from "@measured/puck";
import { config } from "../puck/config";
import { useEffect, useState } from "react";

export const PreviewPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem("puck-data");
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  if (!data) {
    return (
      <div
        style={{
          padding: "20px",
          textAlign: "center",
          fontFamily: "Roboto, sans-serif",
        }}
      >
        Loading preview...
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "Roboto, sans-serif" }}>
      <div
        style={{
          padding: "20px",
          borderBottom: "1px solid #eee",
          backgroundColor: "#f5f5f5",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "24px", color: "#333" }}>Preview</h1>
        <button
          onClick={() => (window.location.href = "/")}
          style={{
            padding: "8px 16px",
            backgroundColor: "#1976d2",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          ← Back to Editor
        </button>
      </div>

      <div style={{ padding: "20px" }}>
        <Render config={config} data={data} />
      </div>
    </div>
  );
};
