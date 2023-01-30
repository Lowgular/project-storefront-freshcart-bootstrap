import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, combineLatest, of } from 'rxjs';
import { filter, map, startWith, switchMap, tap } from 'rxjs/operators';
import { CategoryModel } from '../../models/category.model';
import { CategoryPageParamsQueryModel } from '../../query-models/category-page-params.query-model';
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

  readonly pageParams$: Observable<CategoryPageParamsQueryModel> =
    this._activatedRoute.queryParams.pipe(
      map((params) => ({
        pageSize: params['pageSize'] ? +params['pageSize'] : 5,
        pageNumber: params['pageNumber'] ? +params['pageNumber'] : 1,
      }))
    );
  readonly pageSize$: Observable<number[]> = of([5, 10, 15]);

  readonly products$: Observable<ProductQueryModel[]> = combineLatest([
    this._activatedRoute.params,
    this._productsService.getAllProducts(),
    this.sort.valueChanges.pipe(startWith('priceasc')),
  ]).pipe(
    map(([params, products, sortForm]: [Params, ProductModel[], string]) => {
      const productsMap = products.reduce((acc: any, c: any) => {
        if (c.categoryId === params['categoryId']) {
          return [
            ...acc,
            {
              name: c.name,
              price: c.price,
              ratingValue: c.ratingValue,
              ratingCount: c.ratingCount,
              imageUrl: c.imageUrl,
              featureValue: c.featureValue,
              storeIds: c.storeIds,
              id: c.id,
              starsRating: this._showStars(c.ratingValue),
            },
          ];
        }
        return acc;
      }, []);

      return this._sortingProducts(productsMap, sortForm);
    })
  );
  readonly pageNumber$: Observable<number[]> = combineLatest([
    this.products$,
    this.pageParams$,
  ]).pipe(
    map(([products, params]) => {
      return Array.from(
        Array(Math.ceil(products.length / params.pageSize)).keys()
      ).map((n) => {
        console.log(n + 1);
        return n + 1;
      });
    })
  );

  readonly paginationProducts$: Observable<ProductQueryModel[]> = combineLatest(
    [this.pageParams$, this.products$]
  ).pipe(
    map(([params, products]) =>
      products.slice(
        (params.pageNumber - 1) * params.pageSize,
        params.pageNumber * params.pageSize
      )
    )
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
    private _productsService: ProductsService,
    private _router: Router
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
  private _sortingProducts(
    products: ProductQueryModel[],

    order: string
  ): ProductQueryModel[] {
    if (order.includes('asc')) {
      return products.sort((a, b) => {
        return a.price > b.price ? 1 : -1;
      });
    }
    return products.sort((a: Record<string, any>, b: Record<string, any>) => {
      return a[order] > b[order] ? -1 : 1;
    });
  }

  setPageSize(pageSize: number) {
    combineLatest([this.pageParams$, this.products$])
      .pipe(
        tap(([params, products]) =>
          this._router.navigate([], {
            queryParams: {
              pageSize: pageSize,
              pageNumber: Math.min(
                Math.ceil(products.length / pageSize),
                params.pageNumber
              ),
            },
          })
        )
      )
      .subscribe();
  }

  setPageNumber(pageNumber: number) {
    this.pageParams$
      .pipe(
        tap((params) =>
          this._router.navigate([], {
            queryParams: { pageSize: params.pageSize, pageNumber: pageNumber },
          })
        )
      )
      .subscribe();
  }

  onRangePriceFormSubmitted(rangePriceForm: FormGroup): void {}
}
