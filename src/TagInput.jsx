import React, { useState } from "react";

export default function TagInput({ tags, setTags }) {
  const [inputValue, setInputValue] = useState("");

  const addTag = (tag) => {
    const trimmed = tag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(inputValue);
      setInputValue("");
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: 8,
        borderRadius: 4,
        display: "flex",
        flexWrap: "wrap",
        gap: 6,
        alignItems: "center",
      }}
    >
      {tags.map((tag, idx) => (
        <div
          key={idx}
          style={{
            background: "#007bff",
            color: "white",
            padding: "4px 10px",
            borderRadius: 20,
            display: "flex",
            alignItems: "center",
            fontSize: 14,
          }}
        >
          {tag}
          <button
            onClick={() => removeTag(idx)}
            style={{
              marginLeft: 6,
              background: "transparent",
              border: "none",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: 16,
              lineHeight: 1,
              padding: 0,
            }}
            aria-label={`Remove tag ${tag}`}
          >
            ×
          </button>
        </div>
      ))}

      <input
        type="text"
        placeholder="Type tag and press Enter"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{ flexGrow: 1, border: "none", outline: "none", minWidth: 120 }}
      />
    </div>
  );
}
