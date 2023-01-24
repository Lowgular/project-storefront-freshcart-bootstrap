import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import {Observable, of} from 'rxjs';
import { CategoryModel } from '../../models/category.model';
import { StoreModel } from '../../models/store.model';
import { CategoriesService } from '../../services/categories.service';
import { StoresService } from '../../services/stores.service';

interface knowUsModel {
  id: number;
  name: string;
}
@Component({
  selector: 'app-footer',
  styleUrls: ['./footer.component.scss'],
  templateUrl: './footer.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  readonly categoriesList$: Observable<CategoryModel[]> = this._categoriesService.getAllCategories();
  readonly storesList$: Observable<StoreModel[]> = this._storesService.getAllStores();
  readonly getToKnowUs$: Observable<knowUsModel[]> = of([
    { id: 1, name: 'Company'},
    { id: 2, name: 'About'},
    { id: 3, name: 'Blog'},
    { id: 4, name: 'Help Center'},
    { id: 5, name: 'Our Value'},
    ]);
  constructor(private _categoriesService: CategoriesService, private _storesService: StoresService) {
  }
}
