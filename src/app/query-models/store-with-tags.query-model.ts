export interface StoreWithTagsQueryModel {
  readonly id: string;
  readonly name: string;
  readonly image: string;
  readonly distance: number;
  readonly tags: string[];
}
