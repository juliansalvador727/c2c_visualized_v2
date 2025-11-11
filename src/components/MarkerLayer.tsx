import * as React from "react";
import { Marker } from "react-map-gl/maplibre";

interface MarkerLayerProps {
  start: { latitude: number; longitude: number };
  end: { latitude: number; longitude: number };
}

export default function MarkerLayer({ start, end }: MarkerLayerProps) {
  return (
    <>
      {/* Start Marker */}
      <Marker
        latitude={start.latitude}
        longitude={start.longitude}
        draggable={true}
      />

      {/* End Marker */}
      <Marker
        latitude={end.latitude}
        longitude={end.longitude}
        draggable={true}
      />
    </>
  );
}
