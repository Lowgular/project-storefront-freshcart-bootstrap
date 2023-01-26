export interface StoreWithTagQueryModel {
  readonly name: string;
  readonly logoUrl: string;
  readonly distanceInMeters: number;
  readonly storeTags: string[];
  readonly id: string;
}
