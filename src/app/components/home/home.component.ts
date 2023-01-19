import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Observable, of, combineLatest, map } from 'rxjs';
import { CategoryModel } from '../../models/category.model';
import { StoreModel } from '../../models/store.model';
import { CategoriesService } from '../../services/categories.service';
import { StoresService } from '../../services/stores.service';
import { TagModel } from 'src/app/models/tag.model';
import { StoreOnHomePageQueryModel } from 'src/app/query-models/store-on-home-page.query-model';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  readonly categories$: Observable<CategoryModel[]> = this._categoriesService.getAll();
  readonly stores$: Observable<StoreOnHomePageQueryModel[]> = combineLatest([
    this._storesService.getAll(),
    this._storesService.getAllTags()
  ]).pipe(
    map(([stores, tags] : [StoreModel[], TagModel[]]) => this._mapToStoreQueryModel(stores, tags))
  );


  readonly aboutUs$: Observable<string[]> = of(['Company', 'About', 'Blog', 'Help Center', 'Our Value']);

  private _mobileMenuStatusSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public mobileMenuStatus$: Observable<boolean> = this._mobileMenuStatusSubject.asObservable();


  constructor(private _categoriesService: CategoriesService, private _storesService: StoresService) {
  }

  showMenu(value: boolean): void {
    this._mobileMenuStatusSubject.next(value);
  }

  private _mapToStoreQueryModel(stores: StoreModel[], tags: TagModel[]): StoreOnHomePageQueryModel[] {
    const tagMap = tags.reduce((a, c) => ({...a, [c.id]: c}), {}) as Record<string, TagModel>;

    return stores.map((store) => ({
      id: store.id,
      name: store.name,
      logoUrl: store.logoUrl,
      tags: (store.tagIds ?? []).map((id) => tagMap[id]?.name),
      distance: (store.distanceInMeters/1000)
    }))
  }
}
