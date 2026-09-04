const API_BASE_URL = "http://localhost:5000/api";

async function apiGet(path) {
  const response = await fetch(API_BASE_URL + path);
  if (!response.ok) throw new Error("API request failed");
  return response.json();
}

async function apiPost(path, data) {
  const response = await fetch(API_BASE_URL + path, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error("API request failed");
  return response.json();
}