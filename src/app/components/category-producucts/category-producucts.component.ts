import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, combineLatest, of } from 'rxjs';
import { filter, map, startWith, switchMap } from 'rxjs/operators';
import { CategoryModel } from '../../models/category.model';
import { ProductQueryModel } from '../../query-models/product.query-model';
import { ProductModel } from '../../models/product.model';
import { SortOptionQueryModel } from '../../query-models/sort-option.query-model';
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
  readonly sort: FormControl = new FormControl();
  readonly rangePriceForm: FormGroup = new FormGroup({
    minRange: new FormControl(),
    maxRange: new FormControl(),
  });

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
    this.sort.valueChanges.pipe(startWith('priceAsc')),
  ]).pipe(
    map(([params, products, sortForm]: [Params, ProductModel[], string]) => {
      const filteredProducts = products
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
      return this._sortingProducts(filteredProducts, sortForm);
    })
  );
  readonly sortOption$: Observable<SortOptionQueryModel[]> = of([
    { name: 'Featured', value: 'featureValue' },
    { name: 'Price: Low to High', value: 'priceasc' },
    { name: 'Price: High to Low', value: 'price' },
    { name: 'Avg. Rating', value: 'ratingValue' },
  ]);
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
  ) { }
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
  private _sortingProducts(
    products: ProductQueryModel[],
    order: string
  ): ProductQueryModel[] {
    if (order.includes('asc')) {
      return products.sort((a, b) => {
        console.log('a:', a.price, 'b:', b.price);
        return a.price > b.price ? 1 : -1;
      });
    }
    return products.sort((a: Record<string, any>, b: Record<string, any>) => {
      return a[order] > b[order] ? -1 : 1;
    });
  }

  onRangePriceFormSubmitted(rangePriceForm: FormGroup): void {
  }
}
