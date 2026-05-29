import { Platform } from "react-native";

// 10.0.2.2 es el alias del emulador Android para el localhost de la máquina host.
// Si corrés en un dispositivo físico, reemplazá HOST por la IP LAN de tu PC.

const HOST = Platform.select({
  android: "http://192.168.56.1:5000",
  ios: "http://localhost:5000",
  default: "http://localhost:5000",
});

//const HOST = "http://192.168.100.6:5000";
export const API_BASE = `${HOST}/api`;

export async function apiGet(path) {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error(`GET ${path} -> HTTP ${res.status}`);
  return res.json();
}

export async function apiPost(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    let detail = "";
    try {
      detail = JSON.stringify(await res.json());
    } catch (_) {}
    throw new Error(`POST ${path} -> HTTP ${res.status} ${detail}`);
  }
  return res.json();
}

export async function apiDelete(path) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    let detail = "";
    try {
      detail = JSON.stringify(await res.json());
    } catch (_) {}
    throw new Error(`DELETE ${path} -> HTTP ${res.status} ${detail}`);
  }
  return res.json();
}

export async function getPlaces(query) {
  const res = await fetch(`${API_BASE}/places?q=${query}`);

  if (!res.ok) {
    throw new Error(`Places error -> HTTP ${res.status}`);
  }

  return res.json();
}

export async function getPlaceDetails(placeId) {
  const res = await fetch(`${API_BASE}/places/details?place_id=${placeId}`);

  if (!res.ok) throw new Error("Place details error");

  return res.json();
}