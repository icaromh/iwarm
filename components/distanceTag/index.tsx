import useDistanceBetweenPoints from "../../hooks/useDistance";

type Location = {
  lat: number;
  lng: number;
};

type DistanceTagProps = {
  pointA: Location;
  pointB: Location;
};

function DistanceTag({ pointA, pointB }: DistanceTagProps) {
  const { value, unity } = useDistanceBetweenPoints(pointA, pointB);

  return (
    <span>
      {value}
      {unity}
    </span>
  );
}

export default DistanceTag;
