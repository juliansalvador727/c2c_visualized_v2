import * as turf from "@turf/turf";

import { Feature, Geometry, Polygon, MultiPolygon } from "geojson";

// import worldData from "../data/world_data.json";

interface CountryFeature extends Feature<Geometry, { name: string }> {}

export default function reverseGeocode(
  latitude: number,
  longitude: number,
  worldFeatures: CountryFeature[]
): string {
  // create a turf point obj from ([lon, lat])
  const point = turf.point([longitude, latitude]);

  for (const feature of worldFeatures) {
    const geometry = feature.geometry.type;

    if (geometry === "Polygon" || geometry === "MultiPolygon") {
      try {
        if (
          turf.booleanPointInPolygon(
            point,
            feature as Feature<Polygon | MultiPolygon>
          )
        ) {
          return feature.properties.name;
        }
      } catch (error) {
        console.error("ERROR: pointInPolygon check: ", error);
      }
    }
  }

  return "The Ocean";
}
