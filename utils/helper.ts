import { userStories } from "../mocks";

export const blobToBase64 = (blob: Blob): Promise<string> => {
  return (
    new Promise() <string>
    ((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => {
        reader.abort();
        reject(new DOMException("Problem reading blob."));
      };
      reader.onload = () => {
        if (typeof reader.result === "string") {
          const base64String = reader.result.split(",")[1];
          resolve(base64String);
        } else {
          reject(new Error("Unexpected result type."));
        }
      };
      reader.readAsDataURL(blob);
    })
  );
};

export const fetchBlobFromUri = async (uri: string) => {
  try {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "blob";

    const blobPromise = new Promise((resolve, reject) => {
      xhr.onload = () => resolve(xhr.response);
      xhr.onerror = () => reject(new Error("Network request failed."));
    });

    xhr.open("GET", uri, true);
    xhr.send(null);

    return await blobPromise;
  } catch (error) {
    console.error("Error fetching blob from URI:", error);
    throw error;
  }
};

export const fetchBlobFromUriList = async (uriList) => {
  const blobList = [];
  for (const uri of uriList) {
    const blob = await fetchBlobFromUri(uri);
    blobList.push(blob);
  }
  return blobList;
};

export const generateUUID = () => {
  const chars = "0123456789abcdef";
  const segments = [8, 4, 4, 4, 12];
  let uuid = "";

  segments.forEach((segment, segmentIndex) => {
    for (let i = 0; i < segment; i++) {
      uuid += chars[Math.floor(Math.random() * 16)];
    }
    if (segmentIndex < segments.length - 1) {
      uuid += "-";
    }
  });

  return uuid;
};

export const getRandomNumber = (min: number, max: number) =>
  Math.random() * (max - min) + min;

export function getStoriesFromId(storyId: string) {
  const index = userStories.findIndex((story) => story.id === storyId);

  if (index === -1) {
    return [];
  }

  return userStories.slice(index);
}
