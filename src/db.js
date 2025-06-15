// db.js
const DB_NAME = "LinkbaseDB";
const DB_VERSION = 1;
const STORE_NAME = "saved_links";

export function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);

    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "url" });
      }
    };
  });
}

export async function isLinkSaved(url) {
  const db = await openDB();
  return new Promise((resolve) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const getReq = store.get(url);
    getReq.onsuccess = () => resolve(!!getReq.result);
    getReq.onerror = () => resolve(false);
  });
}

export async function saveLinkLocally(link) {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  store.put(link); // key is url
  return tx.complete;
}
