"use client";

import { useEffect, useState } from "react";

type Coordinates = {
  latitude: number;
  longitude: number;
};

export const useCurrentLocation = () => {
  const [currentLocation, setCurrentLocation] = useState<Coordinates | null>(
    null
  );

  useEffect(() => {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        setCurrentLocation(null);
      }
    );
  }, []);

  return currentLocation;
};
