import { StoreModel } from '../models/store.model';

export interface StoreWithTagsQueryModel {
  // readonly data: StoreModel;
  readonly name: string;
  readonly logoUrl: string;
  readonly distanceInMeters: number;
  readonly tagIds: string[];
  readonly id: string;
  readonly tagNames: string[];
}
