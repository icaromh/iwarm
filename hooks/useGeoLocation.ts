import { useEffect, useState } from "react";

type Location = {
  lat: number;
  lng: number;
};

type LocationProps = {
  location: Location;
  permission: PermissionState;
  hasLocation: "loading" | boolean;
};

const initialState: LocationProps = {
  location: {
    lat: 0,
    lng: 0,
  },
  permission: "prompt",
  hasLocation: "loading",
};
function useGeoLocation(): LocationProps {
  const [location, setLocation] = useState<LocationProps>(initialState);

  useEffect(() => {
    function successGeolocation(position: GeolocationPosition) {
      const { latitude: lat, longitude: lng } = position.coords;
      setLocation((state) => ({
        ...state,
        location: { lat, lng },
        hasLocation: true,
      }));
    }

    navigator.permissions
      .query({ name: "geolocation" })
      .then(function (result: any) {
        const permission = result.state;

        if (permission === "granted" || permission === "prompt") {
          setLocation((state) => ({ ...state, permission }));
          navigator.geolocation.getCurrentPosition(
            successGeolocation,
            () => {
              setLocation((state) => ({
                ...state,
                hasLocation: false,
              }));
            },
            {
              enableHighAccuracy: true,
              timeout: 5000,
              maximumAge: 0,
            }
          );
        } else {
          setLocation((state) => ({
            ...state,
            hasLocation: false,
          }));
        }
      });
  }, []);

  return location;
}

export default useGeoLocation;
