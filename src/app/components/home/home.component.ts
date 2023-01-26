import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryModel } from '../../models/category.model';
import { StoreModel } from '../../models/store.model';
import { StoreTagModel } from '../../models/store-tag.model';
import { CategoriesService } from '../../services/categories.service';
import { StoresService } from '../../services/stores.service';
import {StoreWithTagQueryModel} from "../../query-models/store-with-tag.query-model";

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
  readonly storesWithTagsList$: Observable<StoreWithTagQueryModel[]> = combineLatest([
    this.storesList$,
    this.storesTagsList$,
  ]).pipe(
    map(([stores, tags]) => this._mapToStoreWithTagsQuery(stores, tags))
  )

  private _mapToStoreWithTagsQuery(stores: StoreModel[], tags: StoreTagModel[]) : StoreWithTagQueryModel[] {
    const tagsMap = tags.reduce((a, c) => ({ ...a, [c.id]: c }), {} as Record<string, StoreTagModel>)

    return stores.map(store => ({
      id: store.id,
      name: store.name,
      logoUrl: store.logoUrl,
      distanceInKilometers: +(store.distanceInMeters / 1000).toFixed(1),
      storeTags: (store.tagIds ?? []).map(id => tagsMap[id]?.name)
    }))
  }

  constructor(private _categoriesService: CategoriesService, private _storesService: StoresService) {
  }
}
