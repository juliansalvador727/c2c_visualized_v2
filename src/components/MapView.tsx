"use client";

// react stuff
import * as React from "react";

// maplibre
import { Map, NavigationControl } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

// my components
import MarkerLayer from "./MarkerLayer";

const canada = {
  latitude: 56.1304,
  longitude: -106.3468,
};

const mexico = {
  latitude: 23.6345,
  longitude: -102.5528,
};

export default function MapView() {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Map
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="https://demotiles.maplibre.org/style.json"
      >
        <NavigationControl position="top-left" />
        <MarkerLayer start={canada} end={mexico} />
      </Map>
    </div>
  );
}
