export interface ProductQueryModel {
  readonly name: string;
  readonly price: number;
  readonly ratingValue: number;
  readonly ratingCount: number;
  readonly imageUrl: string;
  readonly featureValue: number;
  readonly storeIds: string[];
  readonly id: string;
  readonly starsRating: number[];
}
