import * as React from "react";

interface Coordinates {
  latitude: number;
  longitude: number;
  country: string;
}

interface CoordinateDisplayProps {
  start: Coordinates;
  end: Coordinates;
}

const containerStyle: React.CSSProperties = {
  position: "absolute",
  bottom: 10,
  left: 10,
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  padding: "10px 15px",
  borderRadius: "8px",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
  zIndex: 10, // Ensure it sits above the map
  fontFamily: "Arial, sans-serif",
  fontSize: "14px",
};

const titleStyle: React.CSSProperties = {
  fontWeight: "bold",
  marginTop: "5px",
  marginBottom: "2px",
  color: "black",
};

const coordStyle: React.CSSProperties = {
  marginLeft: "10px",
  color: "black",
};

export default function CoordinatesDisplay({
  start,
  end,
}: CoordinateDisplayProps) {
  const formatCoord = (coord: number) => coord.toFixed(1);
  return (
    <div style={containerStyle}>
      <div style={titleStyle}>Start: {start.country}</div>
      <div style={coordStyle}>Latitude: {formatCoord(start.latitude)}</div>
      <div style={coordStyle}>Longitude: {formatCoord(start.longitude)}</div>
      <hr
        style={{ margin: "8px 0", border: "none", borderTop: "1px solid #ccc" }}
      />

      {/* End Marker Data */}
      <div style={titleStyle}>End: {end.country}</div>
      <div style={coordStyle}>Latitude: {formatCoord(end.latitude)}</div>
      <div style={coordStyle}>Longitude: {formatCoord(end.longitude)}</div>
    </div>
  );
}
