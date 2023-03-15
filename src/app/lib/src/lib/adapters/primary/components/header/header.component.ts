import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {CategoriesService} from '../../../secondary/services/categories/categories.service';
import {Observable} from 'rxjs';
import {CategoryDTO} from '../../../../application/ports/secondary/dto/category.dto';

@Component({
  selector: 'lib-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  constructor(private categoriesService: CategoriesService) {
  }
  
  categories$: Observable<CategoryDTO[]> = this.categoriesService.getAll();
}
