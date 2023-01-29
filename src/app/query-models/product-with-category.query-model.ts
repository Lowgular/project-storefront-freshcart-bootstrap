export interface ProductWithCategoryQueryModel {
  readonly fruitsAndVegetables: Product[];
  readonly snacksAndMunchies: Product[];
}

export interface Product {
  readonly name: string;
  readonly price: number;
  readonly imageUrl: string;
}
