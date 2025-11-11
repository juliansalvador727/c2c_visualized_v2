import * as React from "react";
import { Marker, MarkerDragEvent } from "react-map-gl/maplibre";

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface MarkerLayerProps {
  start: Coordinates;
  end: Coordinates;

  onStartDragEnd: (event: MarkerDragEvent) => void;
  onEndDragEnd: (event: MarkerDragEvent) => void;
}

export default function MarkerLayer({
  start,
  end,
  onStartDragEnd,
  onEndDragEnd,
}: MarkerLayerProps) {
  return (
    <>
      {/* Start Marker */}
      <Marker
        latitude={start.latitude}
        longitude={start.longitude}
        draggable={true}
        onDragEnd={onStartDragEnd}
        color="#FFB6C1"
      />

      {/* End Marker */}
      <Marker
        latitude={end.latitude}
        longitude={end.longitude}
        draggable={true}
        onDragEnd={onEndDragEnd}
      />
    </>
  );
}
