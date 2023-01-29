import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { StoreTagModel } from 'src/app/models/store-tag.model';
import { StoreWithTagsQueryModel } from 'src/app/query-models/store-with-tags.query-model';
import { CategoryModel } from '../../models/category.model';
import { StoreModel } from '../../models/store.model';
import { CategoriesService } from '../../services/categories.service';
import { StoresService } from '../../services/stores.service';

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

  constructor(
    private _categoriesService: CategoriesService,
    private _storesService: StoresService
  ) {}
}
