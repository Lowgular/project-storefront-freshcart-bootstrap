import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ProductQueryModel } from 'src/app/query-models/product.query-model';
import { CategoryModel } from '../../models/category.model';
import { ProductModel } from '../../models/product.model';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-category-producucts',
  styleUrls: ['./category-producucts.component.scss'],
  templateUrl: './category-producucts.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryProducuctsComponent {
  readonly categoryDetail$: Observable<CategoryModel> =
    this._activatedRoute.params.pipe(
      switchMap((params) =>
        this._categoriesService.getOneCategory(params['categoryId'])
      )
    );
  readonly categories$: Observable<CategoryModel[]> =
    this._categoriesService.getAllCategories();
  readonly products$: Observable<ProductQueryModel[]> = combineLatest([
    this._activatedRoute.params,
    this._productsService.getAllProducts(),
  ]).pipe(
    map(([params, products]: [Params, ProductModel[]]) => {
      return products
        .filter((product) => product.categoryId === params['categoryId'])
        .map((product) => ({
          name: product.name,
          price: product.price,
          ratingValue: product.ratingValue,
          ratingCount: product.ratingCount,
          imageUrl: product.imageUrl,
          featureValue: product.featureValue,
          storeIds: product.storeIds,
          id: product.id,
          starsRating: this._showStars(product.ratingValue),
        }));
    })
  );
  readonly rating$: Observable<any> = of([
    { value: 5, star: this._showStars(5) },
    { value: 4, star: this._showStars(4) },
    { value: 3, star: this._showStars(3) },
    { value: 2, star: this._showStars(2) },
  ]);

  constructor(
    private _categoriesService: CategoriesService,
    private _activatedRoute: ActivatedRoute,
    private _productsService: ProductsService
  ) {}
  private _showStars(ratingValue: number): number[] {
    let stars = [];
    let index = 1;
    for (index; ratingValue >= index; index++) {
      stars.push(1);
    }
    if (ratingValue - stars.length >= 0.5) {
      stars.push(0.5);
    }
    for (index; stars.length < 5; index++) {
      stars.push(0);
    }
    return stars;
  }
}
