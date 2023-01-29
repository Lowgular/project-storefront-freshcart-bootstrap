import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CategoryModel } from '../../models/category.model';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-category-producucts',
  styleUrls: ['./category-producucts.component.scss'],
  templateUrl: './category-producucts.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryProducuctsComponent {
  readonly categoryDetail$: Observable<CategoryModel> =
    this._activatedRoute.params.pipe(
      switchMap((params) =>
        this._categoriesService.getOneCategory(params['categoryId'])
      )
    );
  readonly categories$: Observable<CategoryModel[]> =
    this._categoriesService.getAllCategories();

  constructor(
    private _categoriesService: CategoriesService,
    private _activatedRoute: ActivatedRoute
  ) {}
}
