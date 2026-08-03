import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import * as turf from "@turf/turf";

import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";

export default function PlotMeasurement({ onMeasure }) {
  const map = useMap();

  useEffect(() => {
    // Remove existing controls if any
    if (map.pm) {
      map.pm.removeControls();

      map.pm.addControls({
        position: "topleft",
        drawMarker: false,
        drawCircle: false,
        drawCircleMarker: false,
        drawPolyline: false,
        drawRectangle: false,
        drawText: false,
        drawPolygon: true,
        editMode: true,
        dragMode: true,
        cutPolygon: false,
        removalMode: true,
      });

      map.on("pm:create", (e) => {
        const layer = e.layer;

        const latlngs = layer.getLatLngs()[0];

        const coords = latlngs.map((p) => [p.lng, p.lat]);

        // Close polygon if needed
        if (
          coords.length &&
          (coords[0][0] !== coords[coords.length - 1][0] ||
            coords[0][1] !== coords[coords.length - 1][1])
        ) {
          coords.push(coords[0]);
        }

        const polygon = turf.polygon([coords]);

        const sqm = turf.area(polygon);

        onMeasure(sqm);
      });
    }
  }, [map, onMeasure]);

  return null;
}