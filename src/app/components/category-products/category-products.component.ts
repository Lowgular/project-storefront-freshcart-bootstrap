import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest, of } from 'rxjs';
import {  map, shareReplay, startWith, switchMap } from 'rxjs/operators';
import { CategoryModel } from '../../models/category.model';
import { ProductModel } from '../../models/product.model';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-category-products',
  styleUrls: ['./category-products.component.scss'],
  templateUrl: './category-products.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryProductsComponent {
  readonly selectedSortingOption: FormControl = new FormControl(
    'Featured'
  );
  readonly sortingOptions$: Observable<string[]> = of([
    'Featured',
    'Price: Low To High',
    'Price: High To Low',
    'Avg. Rating',
  ]);

  readonly categoryData$: Observable<CategoryModel> =
    this._activatedRoute.params.pipe(
      switchMap((data) => this._categoriesService.getOne(data['categoryId'])),
      shareReplay(1)
    );
  readonly categories$: Observable<CategoryModel[]> =
    this._categoriesService.getAll();

  readonly productsInCategory$: Observable<ProductModel[]> = combineLatest([
    this._productsService.getAll(),
    this.categoryData$,
    this.selectedSortingOption.valueChanges.pipe(
      startWith('Featured')
    ),
  ]).pipe(
    map(
      ([products, category, sortingOption]: [
        ProductModel[],
        CategoryModel,
        string
      ]) => {
        if (sortingOption === 'Price: Low To High') {
          return products
            .filter((product) => product.categoryId === category.id)
            .sort((a, b) => {
              if (a.price > b.price) return 1;
              if (a.price < b.price) return -1;
              return 0;
            });
        }
        
        if (sortingOption === 'Price: High To Low') {
          return products
            .filter((product) => product.categoryId === category.id)
            .sort((a, b) => {
              if (a.price > b.price) return -1;
              if (a.price < b.price) return 1;
              return 0;
            });
        }

        if (sortingOption === 'Avg. Rating') {
          return products
            .filter((product) => product.categoryId === category.id)
            .sort((a, b) => {
             if (a.ratingValue > b.ratingValue) return -1;
             if (a.ratingValue < b.ratingValue) return 1;
             return 0;
            })
        }

        if (sortingOption === 'Featured') {
          return products
          .filter((product) => product.categoryId === category.id)
          .sort((a, b) => {
            if (a.featureValue > b.featureValue) return -1;
            if (a.featureValue < b.featureValue) return 1;
            return 0;
          })
        }
 
        else {return products
          .filter((product) => product.categoryId === category.id)}
      }
    )
  );

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _categoriesService: CategoriesService,
    private _productsService: ProductsService
  ) {}
}
