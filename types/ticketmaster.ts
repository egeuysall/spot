export type TicketmasterEvent = {
  id: string;
  name: string;
  url: string;
  image: string;
  date: string;
  time: string;
  segment: string;
  genre: string;
  priceRanges: Array<{
    min: number | null;
    max: number | null;
    currency: string;
  }>,
  city: string;
  venue: string;
}