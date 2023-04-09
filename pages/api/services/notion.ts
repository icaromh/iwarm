import { Client } from "@notionhq/client";

const NOTION_SECRET = process.env.NOTION_KEY;
const NOTION_PLACES_TABLE_ID = process.env.NOTION_DATABASE_ID || "";

export default class Notion {
  client?: Client;

  constructor() {
    this.initialize();
  }

  initialize() {
    if (!this.client) {
      this.client = new Client({
        auth: NOTION_SECRET,
      });
    }
  }

  async getPlaces() {
    if (!this.client) throw new Error("Notion client must be initialized");

    const getLast14Days = () => {
      let d = new Date();
      d.setDate(d.getDate() - 14);
      return d.toISOString();
    };

    try {
      return this.client.databases.query({
        database_id: NOTION_PLACES_TABLE_ID,
        sorts: [
          {
            property: "created_at",
            direction: "descending",
          },
        ],
        filter: {
          property: "created_at",
          date: {
            on_or_after: getLast14Days(),
          },
        },
      });
    } catch (error) {
      console.log("caiu no erro");
      console.error(error);
      Promise.resolve([]);
    }
  }

  async checkIn(place: any) {
    try {
      const response = this.client?.pages.create({
        parent: { database_id: NOTION_PLACES_TABLE_ID },
        properties: {
          title: {
            title: [
              {
                text: {
                  content: place.place_id,
                },
              },
            ],
          },
          raw: {
            rich_text: [
              {
                text: {
                  content: JSON.stringify(place),
                },
              },
            ],
          },
          name: {
            rich_text: [
              {
                text: {
                  content: place.name,
                },
              },
            ],
          },
          longitude: {
            rich_text: [
              {
                text: {
                  content: `${place.geometry.location.lng}`,
                },
              },
            ],
          },
          latitude: {
            rich_text: [
              {
                text: {
                  content: `${place.geometry.location.lat}`,
                },
              },
            ],
          },
          address: {
            rich_text: [
              {
                text: {
                  content: place.formatted_address,
                },
              },
            ],
          },
          image: {
            url: place.photo || null,
          },
          rating: {
            number: place.rating,
          },
          country: {
            select: {
              name: place.country,
            },
          },
          city: {
            select: {
              name: place.city,
            },
          },
          type: {
            select: {
              name: place.type,
            },
          },
        },
      });
      return response;
    } catch (error) {
      console.log("caiu no erro");
      console.error(error);
    }
  }
}
