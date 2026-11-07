export const COFFEE_TYPE = {
  ORIGIN: 'Café de Origen',
  BLEND: 'Blend',
} as const;

export class Coffee {
  constructor(
    public id: number,
    public name: string,
    public type: string,
    public region: string,
    public flavor: string,
    public altitude: number,
    public image: string,
  ) {}
}
