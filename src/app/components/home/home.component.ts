import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { StoreQueryModel } from 'src/app/query-models/store.query-model';
import { CategoryModel } from '../../models/category.model';
import { StoreModel } from '../../models/store.model';
import { TagModel } from '../../models/tag.model';
import { CategoriesService } from '../../services/categories.service';
import { StoresService } from '../../services/stores.service';
import { TagsService } from '../../services/tags.service';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  readonly categoryList$: Observable<CategoryModel[]> = this._categoriesService.getAllCategories();
  readonly tagsMap$: Observable<Record<string, TagModel>> = this._tagsService.getTagsMap();
  readonly storeList$: Observable<StoreQueryModel[]> = this.tagsMap$.pipe(
    switchMap((tagsMap) =>
      this._storesService.getAllStores().pipe(map((stores) => this.mapToStoreQueryModel(tagsMap, stores)))
    )
  );

  constructor(
    private _categoriesService: CategoriesService,
    private _storesService: StoresService,
    private _tagsService: TagsService
  ) {}

  mapToStoreQueryModel(tagsMap: Record<string, TagModel>, stores: StoreModel[]): StoreQueryModel[] {
    return stores.map((store) => ({
      id: store.id,
      name: store.name,
      distanceInKm: Math.round((store.distanceInMeters * 10) / 1000) / 10,
      logoUrl: store.logoUrl,
      tags: (store.tagIds ?? []).map((tagId) => tagsMap[tagId].name)
    }));
  }
}
