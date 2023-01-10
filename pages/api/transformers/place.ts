export type PlaceResponse = {
  id: string;
  created_time: string;
  last_edited_time: string;
  body: Place;
};

export type Place = {
  name: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
    viewport: {
      south: number;
      west: number;
      north: number;
      east: number;
    };
  };
  business_status: string;
  formatted_address: string;
  photo: string;
  place_id: string;
  rating: number;
  type: string;
  city?: string;
  country?: string;
};

function getCityAndCountryFromFullAddress(address: string) {
  const parts = address.split(",");
  const country = parts.pop()?.trim();
  const city = parts.pop()?.split(" ").pop()?.trim();

  return { city, country };
}

function transformPlace(places: any): PlaceResponse[] {
  return places.map((place: any) => ({
    id: place.id,
    created_time: place.created_time,
    last_edited_time: place.last_edited_time,
    body: JSON.parse(place?.properties?.raw.rich_text[0].plain_text),
  }));
}

export function transformReqToPlace(place: Place) {
  const { city, country } = getCityAndCountryFromFullAddress(
    place.formatted_address
  );

  return {
    ...place,
    city,
    country,
  };
}

export default transformPlace;
