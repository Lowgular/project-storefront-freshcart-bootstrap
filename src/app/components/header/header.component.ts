import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CategoryModel } from '../../models/category.model';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private _mobileMenuStatusSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public mobileMenuStatus$: Observable<boolean> =
    this._mobileMenuStatusSubject.asObservable();
  readonly categories$: Observable<CategoryModel[]> =
    this._categoriesService.getAll();

  constructor(private _categoriesService: CategoriesService) {}

  showMenu(value: boolean): void {
    this._mobileMenuStatusSubject.next(value);
  }
}
