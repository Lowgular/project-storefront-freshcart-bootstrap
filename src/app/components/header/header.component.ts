import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CategoryModel } from '../../models/category.model';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  readonly categoryList$: Observable<CategoryModel[]> = this._categoriesService.getAllCategories();
  private _hamburgerMenuSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public hamburgerMenu$: Observable<boolean> = this._hamburgerMenuSubject.asObservable();

  constructor(private _categoriesService: CategoriesService) {
  }

  showMenu(): void {
    this._hamburgerMenuSubject.next(true);
  }

  hideMenu(): void {
    this._hamburgerMenuSubject.next(false);
  }
}
