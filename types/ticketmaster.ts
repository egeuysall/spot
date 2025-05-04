export type TicketmasterEvent = {
  id: string,
  name: string,
  url: string,
  image: string,
  date: string,
  time: string,
  segment: string,
  genre: string,
  priceMin: number | null,
  priceMax: number | null,
  city: string,
  venue: string
}