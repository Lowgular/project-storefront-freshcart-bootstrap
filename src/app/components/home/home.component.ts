import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CategoryModel } from '../../models/category.model';
import { StoreModel } from '../../models/store.model';
import { CategoriesService } from '../../services/categories.service';
import { StoresService } from '../../services/stores.service';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  readonly categories$: Observable<CategoryModel[]> = this._categoriesService.getAll();
  readonly stores$: Observable<StoreModel[]> = this._storesService.getAll();
  readonly aboutUs$: Observable<string[]> = of(['Company', 'About', 'Blog', 'Help Center', 'Our Value']);

  private _mobileMenuStatusSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public mobileMenuStatus$: Observable<boolean> = this._mobileMenuStatusSubject.asObservable();


  constructor(private _categoriesService: CategoriesService, private _storesService: StoresService) {
  }

  showMenu(value: boolean): void {
    this._mobileMenuStatusSubject.next(value);
  }
}
