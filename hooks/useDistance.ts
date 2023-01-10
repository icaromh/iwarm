type Position = {
  lat: number;
  lng: number;
};

function degreesToRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

export function distanceInKmBetweenEarthCoordinates(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  var earthRadiusKm = 6371;

  var dLat = degreesToRadians(lat2 - lat1);
  var dLon = degreesToRadians(lon2 - lon1);

  lat1 = degreesToRadians(lat1);
  lat2 = degreesToRadians(lat2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
}

function useDistanceBetweenPoints(pointA: Position, pointB: Position) {
  const distanceInKm = distanceInKmBetweenEarthCoordinates(
    pointA.lat,
    pointA.lng,
    pointB.lat,
    pointB.lng
  );
  
  if (distanceInKm >= 1) {
    return {
      unity: "km",
      value: distanceInKm.toFixed(0),
    };
  }

  const distanceInMeters = (distanceInKm * 1000).toFixed(0);
  return {
    unity: "m",
    value: distanceInMeters,
  };
}

export default useDistanceBetweenPoints;
