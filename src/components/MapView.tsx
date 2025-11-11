"use client";

// react stuff
import React, { useState, useCallback, useEffect } from "react";

// maplibre
import { Map, NavigationControl, MarkerDragEvent } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

// my components
import MarkerLayer from "./MarkerLayer";
import StartEndCountryLayer from "./StartEndCountryLayer";
import CoordinatesDisplay from "./CoordinatesDisplay";
import reverseGeocode from "../utils/geocoding";

import worldData from "../data/world_data.json";
interface CoordsWithCountry {
  latitude: number;
  longitude: number;
  country: string;
}

const WORLD_FEATURES = worldData.features;

const INITIAL_START: CoordsWithCountry = {
  latitude: 56.1304,
  longitude: -106.3468,
  country: "Canada",
};
const INITIAL_END: CoordsWithCountry = {
  latitude: 23.6345,
  longitude: -102.5528,
  country: "Mexico",
};

export default function MapView() {
  const [start, setStart] = useState(INITIAL_START);
  const [end, setEnd] = useState(INITIAL_END);

  //  function which handles the drag end for start marker

  const updateMarker = useCallback(
    (event: MarkerDragEvent, isStart: boolean) => {
      const newLat = event.lngLat.lat;
      const newLng = event.lngLat.lng;

      const newCountry = reverseGeocode(newLat, newLng, WORLD_FEATURES as any);
      const newCoords = {
        latitude: newLat,
        longitude: newLng,
        country: newCountry,
      };
      if (isStart) {
        setStart(newCoords);
      } else {
        setEnd(newCoords);
      }
    },
    []
  );
  const handleStartDragEnd = useCallback(
    (event: MarkerDragEvent) => {
      updateMarker(event, true);
    },
    [updateMarker]
  );

  // fcn which handles the drag end for end marker
  const handleEndDragEnd = useCallback(
    (event: MarkerDragEvent) => {
      updateMarker(event, false);
    },
    [updateMarker]
  );

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Map
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14,
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
        mapStyle="https://tiles.basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
      >
        <NavigationControl position="top-left" />
        <MarkerLayer
          start={start}
          end={end}
          onStartDragEnd={handleStartDragEnd}
          onEndDragEnd={handleEndDragEnd}
        />
        <CoordinatesDisplay start={start} end={end} />
        <StartEndCountryLayer start={start.country} end={end.country} />
      </Map>
    </div>
  );
}
