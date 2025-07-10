import { useState } from 'react';
import styled from 'styled-components';

import TagInputV2 from "./TagInputV2";
import TagInput from "./TagInput";

import { isLinkSaved, saveLinkLocally } from "./db";

const AppV2 = () => {
  const [tags, setTags] = useState([]);
  const [status, setStatus] = useState("");

  const updateIcon = async (saved) => {
    chrome.action.setIcon({
      path: saved
        ? {
            16: "icons/saved-linkbase.png",
            32: "icons/saved-linkbase.png",
            48: "icons/saved-linkbase.png",
          }
        : {
            16: "icons/unsaved-linkbase.png",
            32: "icons/unsaved-linkbase.png",
            48: "icons/unsaved-linkbase.png",
          },
    });
  };


  const saveCurrentTab = async () => {
    try {
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
      const currentUrl = tabs[0].url;

      const alreadySaved = await isLinkSaved(currentUrl);

      if (alreadySaved) {
        setStatus("✅ Already saved locally.");
        updateIcon(true);
        return;
      }

      const res = await fetch("http://localhost:8000/links/save/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: currentUrl, tags }),
      });

      if (!res.ok) throw new Error("Failed to save remotely");

      const data = await res.json();

      setStatus("✅ Saved to server & local");
      saveLinkLocally({ url: currentUrl, tags });
      setTags([]);
      updateIcon(true);
    } catch (error) {
      console.error(error);
      setStatus("❌ Save failed.");
      updateIcon(false);
    }
  };

  return (
    <Wrapper>
      <Header>
        <h2>Linkbase</h2>
      </Header>

      <TagInputV2 tags={tags} setTags={setTags} />

      <button
        onClick={saveCurrentTab}
        style={{
          width: "100%",
          padding: "10px",
          background: "#686cb9",
          border: "none",
          color: "white",
          fontSize: 16,
          borderRadius: 4,
          cursor: "pointer",
          marginTop: 12,
        }}
      >
        Save
      </button>

      {status && <p style={{ marginTop: 12 }}>{status}</p>}
    </Wrapper>
  );
};

const Wrapper = styled.div`

  margin: auto;
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  min-width: 200px;

  max-width: 400;

  font-family: Arial, sans-serif;
`;
const Header = styled.div`

   background: grey;
   width: 200px;
    border-radius: 10px;
   display: flex;
    flex-direction: column;
    -webkit-box-align: center;
    /* align-items: center; */
    place-items: center;
`;
export default AppV2;
