import { ImageResponse } from "next/og";
export const alt = "Venuja Ranasinghe — Data Science & AI undergraduate at SLIIT";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", background: "#04060b", color: "white", padding: 80 }}><div style={{ fontSize: 72, fontWeight: 700 }}>Venuja Ranasinghe</div><div style={{ fontSize: 38, color: "#6b93ff", marginTop: 24 }}>Data Science & AI · SLIIT</div><div style={{ fontSize: 28, marginTop: 64 }}>Machine learning · Data · Software engineering</div></div>, size);
}
