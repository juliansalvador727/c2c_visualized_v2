"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Map, NavigationControl, MarkerDragEvent } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

import MarkerLayer from "./MarkerLayer";
import CountryLayer from "./CountryLayer";
import StartEndCountryLayer from "./StartEndCountryLayer";
import CoordinatesDisplay from "./CoordinatesDisplay";
import reverseGeocode from "../utils/geocoding";
import { BFSController } from "./BFSController";
import rawWorldData from "../data/world_data.json";
import type { FeatureCollection, Geometry } from "geojson";

export interface CoordsWithCountry {
  latitude: number;
  longitude: number;
  country: string;
}

const worldData = rawWorldData as FeatureCollection<Geometry>;
const WORLD_FEATURES = worldData.features ?? [];

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

  // Safe ISO state
  const [startISO, setStartISO] = useState("");
  const [endISO, setEndISO] = useState("");

  const [bfsResult, setBfsResult] = useState({
    visited: [] as string[],
    shortestPath: [] as string[],
  });

  // Build a safe mapping: always prefer valid iso_a3, fallback to iso_a3_eh
  const countryNameToIso: Record<string, string> = {};
  WORLD_FEATURES.forEach((feature) => {
    const props = feature.properties as any;
    const name = props.name;
    const iso =
      props.iso_a3 && props.iso_a3 !== "-99" ? props.iso_a3 : props.iso_a3_eh;
    if (name && iso) countryNameToIso[name] = iso;
  });

  useEffect(() => {
    setStartISO(countryNameToIso[start.country] ?? "");
    setEndISO(countryNameToIso[end.country] ?? "");
  }, [start, end]);

  // BFS result state

  useEffect(() => {
    if (!startISO || !endISO) return;

    const controller = new BFSController();
    const result = controller.runBFS(
      { country: startISO } as any,
      { country: endISO } as any
    );
    setBfsResult({
      visited: result.visited,
      shortestPath: result.shortestPath,
    });
  }, [startISO, endISO]);

  // Marker drag handling
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
      if (isStart) setStart(newCoords);
      else setEnd(newCoords);
    },
    []
  );

  const handleStartDragEnd = useCallback(
    (event: MarkerDragEvent) => updateMarker(event, true),
    [updateMarker]
  );
  const handleEndDragEnd = useCallback(
    (event: MarkerDragEvent) => updateMarker(event, false),
    [updateMarker]
  );

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Map
        initialViewState={{ longitude: -122.4, latitude: 37.8, zoom: 3 }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="https://tiles.basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
      >
        {/* Country coloring layer */}
        <CountryLayer
          geoData={worldData}
          visitedCountries={bfsResult.visited}
          shortestPathCountries={bfsResult.shortestPath}
          startCountry={startISO}
          endCountry={endISO}
        />

        <NavigationControl position="top-left" />

        {/* Start/end markers */}
        <MarkerLayer
          start={start}
          end={end}
          onStartDragEnd={handleStartDragEnd}
          onEndDragEnd={handleEndDragEnd}
        />

        {/* Coordinates display */}
        <CoordinatesDisplay start={start} end={end} />

        {/* Separate highlight layer for start/end */}
        <StartEndCountryLayer start={start.country} end={end.country} />
      </Map>
    </div>
  );
}
