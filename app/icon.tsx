import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFFFFF",
          borderRadius: "50%",
          border: "3px solid #04294A",
        }}
      >
        <span
          style={{
            fontSize: 40,
            fontWeight: 900,
            color: "#04294A",
            fontFamily: "Georgia, serif",
            marginTop: -3,
          }}
        >
          Z
        </span>
      </div>
    ),
    {
      ...size,
    }
  );
}

