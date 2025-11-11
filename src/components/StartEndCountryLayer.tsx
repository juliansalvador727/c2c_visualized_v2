import * as React from "react";
import { Source, Layer } from "react-map-gl/maplibre";
import type { FeatureCollection } from "geojson";

interface StartEndCountryLayerProps {
  start: string;
  end: string;
}

export default function CountryLayer({
  start,
  end,
}: StartEndCountryLayerProps) {
  return (
    <p>
      This is ${start}, and ${end}
    </p>
  );
}
