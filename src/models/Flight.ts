import { Station } from "./Station";

export class Flight {
  constructor(
    public origin: Station,
    public destination: Station,
    public cost: number,
    public duration: number
  ) {}
}
