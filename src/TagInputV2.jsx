import React, { useState } from 'react';
import styled from 'styled-components';

const TagInputV2 = ({ tags, setTags }) => {
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
    <Wrapper

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
    </Wrapper>
  );
};
const Wrapper = styled.div`

  border: 1px solid rgb(204, 204, 204);
  padding: 8px;
  border-radius: 4px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
  margin-top: 10px;
/*
  margin: auto;
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  min-width: 200px;

  max-width: 400;

  font-family: Arial, sans-serif;
  */
`;

export default TagInputV2;
