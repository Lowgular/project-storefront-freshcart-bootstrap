import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryModel } from '../../models/category.model';
import { StoreWithTagsQueryModel } from '../../query-models/store-with-tags.query-model';
import { StoreTagModel } from '../../models/store-tag.model';
import { ProductModel } from '../../models/product.model';
import { CategoriesService } from '../../services/categories.service';
import { StoresService } from '../../services/stores.service';
import { ProductsService } from '../../services/products.service';
import {
  Product,
  ProductWithCategoryQueryModel,
} from 'src/app/query-models/product-with-category.query-model';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly categories$: Observable<CategoryModel[]> =
    this._categoriesService.getAllCategories();
  readonly stores$: Observable<StoreWithTagsQueryModel[]> = combineLatest([
    this._storesService.getAllStores(),
    this._storesService.getAllStoreTags(),
  ]).pipe(
    map(([stores, tags]) => {
      const tagsMap = tags.reduce((acc, c) => {
        return { ...acc, [c.id]: c };
      }, {}) as Record<string, StoreTagModel>;
      return stores.map((store) => ({
        id: store.id,
        name: store.name,
        image: store.logoUrl,
        distance: store.distanceInMeters / 1000,
        tags: store.tagIds.map((tagId) => tagsMap[tagId]?.name),
      }));
    })
  );
  readonly products$: Observable<ProductWithCategoryQueryModel> =
    this._productsService.getAllProducts().pipe(
      map((products) => ({
        fruitsAndVegetables: this.getProductsOfCategory('5', products),
        snacksAndMunchies: this.getProductsOfCategory('2', products),
      }))
    );

  constructor(
    private _categoriesService: CategoriesService,
    private _storesService: StoresService,
    private _productsService: ProductsService
  ) {}
  private getProductsOfCategory(
    categoryId: string,
    products: ProductModel[]
  ): ProductModel[] {
    return products
      .filter((product) => product.categoryId === categoryId)
      .sort((a, b) => {
        if (a.featureValue > b.featureValue) return -1;
        if (a.featureValue < b.featureValue) return 1;
        return 0;
      })
      .slice(0, 5);
  }
}
