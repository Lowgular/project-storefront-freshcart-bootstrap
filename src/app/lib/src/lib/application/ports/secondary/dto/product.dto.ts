export interface ProductDTO {
  readonly name: string;
  readonly imageUrl: string;
  readonly id: string;
  readonly categoryId: string;
  readonly featureValue: number;
  readonly price: number;
  readonly ratingCount: number;
  readonly ratingValue: number;
  readonly storeIds: string[];
}
