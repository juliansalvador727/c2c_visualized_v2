import * as React from "react";
import { Source, Layer } from "react-map-gl/maplibre";
import worldData from "../data/world_data.json";
import type { FeatureCollection } from "geojson";

interface StartEndCountryLayerProps {
  start: string /* e.g. Canada */;
  end: string /* e.g. Mexico */;
}

export default function StartEndCountryLayer({
  start,
  end,
}: StartEndCountryLayerProps) {
  const data: FeatureCollection = {
    type: "FeatureCollection",
    features: (worldData as FeatureCollection).features.filter((f) =>
      [start, end].includes(f.properties?.name)
    ),
  };

  const paint =
    start === end
      ? { "fill-color": "#a020f0", "fill-opacity": 0.6 }
      : {
          "fill-color": [
            "case",
            ["==", ["get", "name"], start],
            "#ff69b4",
            ["==", ["get", "name"], end],
            "#1e90ff",
            "#000000",
          ] as any,
          "fill-opacity": 0.6,
        };

  return (
    <Source id="countries" type="geojson" data={data}>
      <Layer id="country-fill" type="fill" paint={paint} />
      <Layer
        id="country-outline"
        type="line"
        paint={{ "line-color": "#000", "line-width": 0.5 }}
      />
    </Source>
  );
}
