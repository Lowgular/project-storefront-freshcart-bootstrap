import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CategoryModel } from '../../models/category.model';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-navbar',
  styleUrls: ['./navbar.component.scss'],
  templateUrl: './navbar.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  readonly categories$: Observable<CategoryModel[]> =
    this._categoriesService.getAllCategories();
  private _hamburgerNavigationSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public hamburgerNavigation$: Observable<boolean> =
    this._hamburgerNavigationSubject.asObservable();

  constructor(private _categoriesService: CategoriesService) {}
  showNavigation(): void {
    this._hamburgerNavigationSubject.next(true);
  }
  hideNavigation(): void {
    this._hamburgerNavigationSubject.next(false);
  }
}
