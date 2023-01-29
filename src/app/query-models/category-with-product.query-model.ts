import {ProductQueryModel} from "./product.query-model";

export interface CategoryWithProductQueryModel {
  readonly categoryId: string;
  readonly categoryName: string;
  readonly products: ProductQueryModel[];
}
