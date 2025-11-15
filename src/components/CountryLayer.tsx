"use client";

import * as React from "react";
import { Source, Layer } from "react-map-gl/maplibre";
import type { FeatureCollection } from "geojson";

interface Props {
  geoData: FeatureCollection;
  visitedCountries: string[]; // array of ISO_A3 codes
  shortestPathCountries: string[]; // array of ISO_A3 codes
  startCountry: string; // ISO_A3
  endCountry: string; // ISO_A3
}

export default function CountryLayer({
  geoData,
  visitedCountries,
  shortestPathCountries,
  startCountry,
  endCountry,
}: Props) {
  // filter out start/end from BFS coloring
  const visitedFiltered = visitedCountries.filter(
    (iso) => iso !== startCountry && iso !== endCountry
  );
  const pathFiltered = shortestPathCountries.filter(
    (iso) => iso !== startCountry && iso !== endCountry
  );

  //   React.useEffect(() => {
  //     console.group("CountryLayer Debug");
  //     console.log("Start country:", startCountry);
  //     console.log("End country:", endCountry);
  //     console.log("Visited countries (filtered):", visitedFiltered);
  //     console.log("Shortest path countries (filtered):", pathFiltered);
  //     console.groupEnd();
  //   }, [visitedFiltered, pathFiltered, startCountry, endCountry]);

  const features = geoData.features.map((f) => {
    const iso =
      f.properties?.iso_a3 !== "-99"
        ? f.properties?.iso_a3
        : f.properties?.iso_a3_eh || f.properties?.adm0_iso || "";
    return { ...f, properties: { ...f.properties, iso } };
  });
  const normalizedData: FeatureCollection = { ...geoData, features };
  return (
    <Source id="bfs-countries" type="geojson" data={normalizedData}>
      {/* Visited countries */}
      <Layer
        id="visited-fill"
        type="fill"
        paint={{
          "fill-color": [
            "case",
            ["in", ["get", "iso_a3"], ["literal", visitedFiltered]],
            "#ADD8E6", // light blue
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
          "fill-opacity": 0.7,
        }}
      />
    </Source>
  );
}
