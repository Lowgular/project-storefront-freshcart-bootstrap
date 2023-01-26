import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { ProductCategoryModel } from 'src/app/models/products-category.model';
import { StoreModel } from 'src/app/models/store.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { StoresService } from 'src/app/services/stores.service';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly categories$: Observable<ProductCategoryModel[]> =
    this._productCategoriesService.getAllCategories();

  readonly stores$: Observable<StoreModel[]> =
    this._storesService.getAllStores();

  constructor(
    private _productCategoriesService: CategoriesService,
    private _storesService: StoresService
  ) {}
}
