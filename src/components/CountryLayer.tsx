"use client";

import * as React from "react";
import { Source, Layer } from "react-map-gl/maplibre";
import type { FeatureCollection } from "geojson";

interface CountryLayerProps {
  geoData: FeatureCollection;
  visitedCountries: string[];
  shortestPathCountries: string[];
  startCountry: string;
  endCountry: string;
}

export default function CountryLayer({
  geoData,
  visitedCountries,
  shortestPathCountries,
  startCountry,
  endCountry,
}: CountryLayerProps) {
  // filter out start/end from BFS coloring
  const visitedFiltered = visitedCountries.filter(
    (iso) => iso !== startCountry && iso !== endCountry
  );
  const pathFiltered = shortestPathCountries.filter(
    (iso) => iso !== startCountry && iso !== endCountry
  );

  //   debugging
  //   React.useEffect(() => {
  //     console.group("CountryLayer Debug");
  //     console.log("Start country:", startCountry);
  //     console.log("End country:", endCountry);
  //     console.log("Visited countries (filtered):", visitedFiltered);
  //     console.log("Shortest path countries (filtered):", pathFiltered);
  //     console.groupEnd();
  //   }, [visitedFiltered, pathFiltered, startCountry, endCountry]);
  return (
    <Source id="bfs-countries" type="geojson" data={geoData}>
      {/* Visited countries */}
      <Layer
        id="visited-fill"
        type="fill"
        paint={{
          "fill-color": [
            "case",
            ["in", ["get", "iso_a3"], ["literal", visitedFiltered]],
            "#ADD8E6",
            "transparent",
          ],
          "fill-opacity": 0.5,
        }}
      />

      {/* Shortest path countries */}
      <Layer
        id="path-fill"
        type="fill"
        paint={{
          "fill-color": [
            "case",
            ["in", ["get", "iso_a3"], ["literal", pathFiltered]],
            "#00008B", // dark blue
            "transparent",
          ],
          "fill-opacity": 0.5,
        }}
      />
    </Source>
  );
}
