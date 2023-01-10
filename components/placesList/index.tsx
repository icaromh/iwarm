import React from "react";
import Image from "next/image";
import styles from "./placesList.module.css";

interface PlacesList {
  places: Array<any>;
}

function groupByDate(places: any) {
  return places.reduce((acc: any, cur: any) => {
    const date = cur.created_time.split("T")[0];
    if (!acc[date]) {
      acc[date] = {
        title: date,
        items: [cur],
      };
    } else {
      acc[date]["items"] = [...acc[date]["items"], cur];
    }

    return { ...acc };
  }, {});
}

function GroupTitle({ date }: any) {
  const curDate = new Date(date);
  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
  } as Intl.DateTimeFormatOptions;

  const formatedDate = new Intl.DateTimeFormat("en-US", options).format(
    curDate
  );
  const today = new Intl.DateTimeFormat("en-US", options).format(new Date());
  const isToday = today === formatedDate;

  return (
    <div className={styles.groupTitle}>
      <div className={styles.track}></div>
      <h1>{isToday ? "Today" : formatedDate}</h1>
    </div>
  );
}

function PlacesList({ places }: PlacesList) {
  const groups = groupByDate(places);

  function getPlaceAddress(address: any) {
    const parts = address.split(",");
    const country = parts.at(-1).trim();
    const city = parts.at(-2).split(" ").at(-1).trim();

    return `${city}, ${country}`;
  }

  return (
    <div className={styles.container}>
      {Object.keys(groups).map((day) => {
        return (
          <React.Fragment key={day}>
            <GroupTitle date={day} />
            {groups[day].items.map((p: any) => (
              <article key={p.id} className={styles.placeItem}>
                <div className={styles.trackItem}>
                  <span className={styles.placeIcon}>
                    {p.body.type && (
                      <Image alt={p.body.name} src={`/images/categories/${p.body.type}.svg`} width={30} height={30} />
                    )}
                  </span>
                </div>
                <div className={styles.place}>
                  <span className={styles.placeName}>{p.body.name}</span>
                  <span className={styles.placeAddress}>
                    {getPlaceAddress(p.body.formatted_address)}
                  </span>
                </div>
              </article>
            ))}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default PlacesList;
