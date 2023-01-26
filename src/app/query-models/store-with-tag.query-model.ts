export interface StoreWithTagQueryModel {
  readonly name: string;
  readonly logoUrl: string;
  readonly distanceInKilometers: number;
  readonly storeTags: string[];
  readonly id: string;
}
