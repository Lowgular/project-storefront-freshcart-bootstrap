export interface ProductWithStarsQueryModel {
  readonly name: string;
  readonly imageUrl: string;
  readonly price: number;
  readonly ratingValue: number[];
}
