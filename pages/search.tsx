/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Image from "next/image";
import SearchBox from "../components/searchbox";
import { useState } from "react";

import styles from "../styles/search.module.css";
import Button from "../components/button";
import AppLayout, {
  AppLayoutContent,
  AppLayoutHeader,
} from "../components/layout/app";
import DistanceTag from "../components/distanceTag";
import useGeoLocation from "../hooks/useGeoLocation";

const LOADING = "IS_LOADING";
const FINISHED = "IS_FINISHED";

function getObject(place: any) {
  return {
    name: place.name,
    geometry: place.geometry,
    business_status: place.business_status,
    formatted_address: place.formatted_address,
    photo: place.photos && place.photos[0] ? place.photos[0].getUrl() : "",
    place_id: place.place_id,
    rating: place.rating || 0,
    type: place.types[0],
  };
}

export default function CheckInPage() {
  const { hasLocation, location } = useGeoLocation();
  const [places, setPlaces] = useState([]);
  const [reqState, setReqState] = useState("");

  async function checkInPlace(place: any) {
    setReqState(LOADING);
    await fetch("/api/place", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      body: JSON.stringify(getObject(place)), // body data type must match "Content-Type" header
    });
    setReqState(FINISHED);
  }

  return (
    <>
      <Head>
        <title>Check in</title>
      </Head>
      <AppLayout>
        <AppLayoutHeader title={"Where are you?"}>
          <SearchBox onPlacesLoaded={setPlaces} />
        </AppLayoutHeader>
        <AppLayoutContent>
          <div className={styles.placesList}>
            {places &&
              places.map((place: any) => {
                return (
                  <div className={styles.placesListItem} key={place.place_id}>
                    <div className={styles.placeImage}>
                      <Image
                        alt={place.name}
                        src={`/images/categories/${place.types[0]}.svg`}
                        width={30}
                        height={30}
                      />
                    </div>
                    <div className={styles.placeDetails}>
                      <div className={styles.placeName}>
                        <a
                          href={`https://www.google.com/maps?q=${
                            place.name + ", " + place.formatted_address
                          }`}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {place.name}
                        </a>
                      </div>
                      <div className={styles.placeAddress}>
                        {place.formatted_address}
                      </div>

                      <div className={styles.placeDetailsBottom}>
                        {hasLocation && (
                          <DistanceTag
                            pointA={{
                              lat: place.geometry.location.lat(),
                              lng: place.geometry.location.lng(),
                            }}
                            pointB={location}
                          />
                        )}

                        <span className={styles.placeRating}>
                          ⭐️ {place?.rating?.toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <div className={styles.placeButtonRegion}>
                      <Button
                        disabled={reqState === LOADING}
                        onClick={(ev: any) => {
                          ev.preventDefault();
                          checkInPlace(place);
                        }}
                      >
                        check in
                      </Button>
                    </div>
                  </div>
                );
              })}
          </div>
        </AppLayoutContent>
      </AppLayout>
    </>
  );
}
