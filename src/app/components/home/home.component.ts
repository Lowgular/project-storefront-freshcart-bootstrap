import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import {Observable, combineLatest, of} from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryModel } from '../../models/category.model';
import { StoreModel } from '../../models/store.model';
import { StoreTagModel } from '../../models/store-tag.model';
import { StoreWithTagQueryModel } from '../../query-models/store-with-tag.query-model';
import { ProductModel } from '../../models/product.model';
import { CategoriesService } from '../../services/categories.service';
import { StoresService } from '../../services/stores.service';
import { ProductsService } from '../../services/products.service';
import {CategoryWithProductQueryModel} from "../../query-models/category-with-product.query-model";

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  readonly categoriesList$: Observable<CategoryModel[]> = this._categoriesService.getAllCategories();
  readonly storesList$: Observable<StoreModel[]> = this._storesService.getAllStores();
  readonly storesTagsList$: Observable<StoreTagModel[]> = this._storesService.getAllStoreTags()
  readonly productsList$: Observable<ProductModel[]> = this._productsService.getAllProducts();
  readonly categoryWithProductsIds$: Observable<string[]> = of(['5', '2']);
  readonly storesWithTagsList$: Observable<StoreWithTagQueryModel[]> = combineLatest([
    this.storesList$,
    this.storesTagsList$,
  ]).pipe(
    map(([stores, tags]) => this._mapToStoreWithTagsQuery(stores, tags))
  )

  readonly categoriesWithProductsList$: Observable<CategoryWithProductQueryModel[]> = combineLatest([
    this.productsList$,
    this.categoriesList$,
    this.categoryWithProductsIds$
  ]).pipe(
    map(([products, categories, ids]) => this._mapToCategoryWithProductQuery(products, categories, ids))
  )


  private _mapToStoreWithTagsQuery(stores: StoreModel[], tags: StoreTagModel[]): StoreWithTagQueryModel[] {
    const tagsMap = tags.reduce((a, c) => ({ ...a, [c.id]: c }), {} as Record<string, StoreTagModel>)

    return stores.map(store => ({
      id: store.id,
      name: store.name,
      logoUrl: store.logoUrl,
      distanceInKilometers: +(store.distanceInMeters / 1000).toFixed(1),
      storeTags: (store.tagIds ?? []).map(id => tagsMap[id]?.name)
    }))
  }

  constructor(private _categoriesService: CategoriesService, private _storesService: StoresService, private _productsService: ProductsService) {
  }

  private _mapToCategoryWithProductQuery(products: ProductModel[], categories: CategoryModel[], ids: string[]) : CategoryWithProductQueryModel[] {
    const categoryMap = categories.reduce((a, c) => ({ ...a, [c.id]: c}), {} as Record<string, CategoryModel>)
    return ids.map(id => ({
      categoryId: id,
      categoryName: categoryMap[id]?.name,
      products: products.filter(product => product.categoryId === id)
        .map(product => ({
          id: product.id,
          name: product.name,
          imageUrl: product.imageUrl,
          price: Math.round(product.price),
          featureValue: product.featureValue
        }))
        .slice(0, 5)
        .sort((a, b) => b.featureValue > a.featureValue ? 1 : -1)
    }))
  }
}
