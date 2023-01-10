import { useEffect, useRef } from "react";
import { distanceInKmBetweenEarthCoordinates } from "../../hooks/useDistance";
import useGeoLocation from "../../hooks/useGeoLocation";
import Button from "../button";

import styles from "./searchbox.module.css";

interface SearchBox {
  onPlacesLoaded: Function;
}

function SearchBox({ onPlacesLoaded }: SearchBox) {
  const searchInput = useRef<HTMLInputElement>(null);
  const { location, hasLocation } = useGeoLocation();

  function getFillRule(hasLocation: "loading" | boolean) {
    if (hasLocation === "loading") return "white";
    return hasLocation ? "green" : "red";
  }
  const fillRule = getFillRule(hasLocation);

  useEffect(() => {
    if (searchInput.current) {
      const input = searchInput.current as HTMLInputElement;
      let searchBoxOptions = null;
      if (hasLocation) {
        const boundsLiteral: google.maps.LatLngBoundsLiteral = {
          north: location.lat + 0.1,
          south: location.lat - 0.1,
          east: location.lng + 0.1,
          west: location.lng - 0.1,
        };
        searchBoxOptions = {
          bounds: boundsLiteral,
        };
      }

      const searchBox = new google.maps.places.SearchBox(
        input,
        searchBoxOptions
      );
      searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();
        if (searchInput.current) {
          searchInput.current.blur();
        }
        if (places && hasLocation) {
          return onPlacesLoaded(
            places
              .map((place: google.maps.places.PlaceResult) => {
                let distance = 9999;
                if (place.geometry?.location) {
                  distance = distanceInKmBetweenEarthCoordinates(
                    location.lat,
                    location.lng,
                    place.geometry?.location?.lat(),
                    place.geometry?.location?.lng()
                  );
                }

                return {
                  ...place,
                  distance,
                };
              })
              .sort((placeA, placeB) => {
                if (placeA.distance < placeB.distance) {
                  return -1;
                }
                if (placeA.distance > placeB.distance) {
                  return 1;
                }
                return 0;
              })
          );
        }

        onPlacesLoaded(places);
      });
    }
  }, [onPlacesLoaded, hasLocation, location]);

  return (
    <form className={styles.searchBox} onSubmit={(ev) => ev.preventDefault()}>
      <span className={styles.searchLocation}>
        <svg height={20} width={20} viewBox="0 0 64 64">
          <path
            fillRule="evenodd"
            d="M33.6 55.206h0c-.64.87-1.86 1.07-2.74.44 -.18-.13-.33-.28-.45-.45C27.634 51.306 16 34.38 16 24l0 0c0-8.84 7.16-16 16-16 8.83 0 16 7.16 16 16 -.001 10.37-11.64 27.29-14.41 31.18Zm-1.59-41.19v0c-5.53 0-10 4.47-10 10 0 5.52 4.47 10 10 10 5.52 0 10-4.48 10-10v0c0-5.53-4.48-10-10-10Z"
            fill={fillRule}
          />
        </svg>
      </span>
      <input
        type="input"
        ref={searchInput}
        className={styles.search}
        placeholder="Type the place's name"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
      />
      <button className={styles.searchClearBtn} type="reset">𝗑</button>
    </form>
  );
}

export default SearchBox;
