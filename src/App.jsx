import { useState } from "react";
import TagInput from "./TagInput";

export default function App() {
  const [tags, setTags] = useState([]);
  const [status, setStatus] = useState("");

  const saveCurrentTab = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentUrl = tabs[0].url;
      fetch("http://localhost:8000/links/save/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: currentUrl, tags }),
      })
        .then((res) => {
          if (res.ok) {
            setStatus("✅ Saved!");
            setTags([]);
          } else {
            setStatus("❌ Failed to save.");
          }
        })
        .catch(() => setStatus("⚠️ Network error."));
    });
  };

  return (
    <div style={{ maxWidth: 400, margin: "20px auto", fontFamily: "Arial, sans-serif" }}>
      <h2>Linkbase</h2>

      <TagInput tags={tags} setTags={setTags} />

      <button
        onClick={saveCurrentTab}
        style={{
          width: "100%",
          padding: "10px",
          background: "#007bff",
          border: "none",
          color: "white",
          fontSize: 16,
          borderRadius: 4,
          cursor: "pointer",
          marginTop: 12,
        }}
      >
        Save Current Tab
      </button>

      {status && <p style={{ marginTop: 12 }}>{status}</p>}
    </div>
  );
}
