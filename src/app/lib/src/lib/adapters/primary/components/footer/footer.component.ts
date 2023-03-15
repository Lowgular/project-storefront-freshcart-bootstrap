import {
	ChangeDetectionStrategy,
	Component,
	ViewEncapsulation,
} from '@angular/core';
import {CategoriesService} from '../../../secondary/services/categories/categories.service';
import {StoresService} from '../../../secondary/services/stores/stores.service';
import {Observable, of} from 'rxjs';
import {CategoryDTO} from '../../../../application/ports/secondary/dto/category.dto';
import {StoreDTO} from '../../../../application/ports/secondary/dto/store.dto';

@Component({
	selector: 'lib-footer',
	styleUrls: ['./footer.component.scss'],
	templateUrl: './footer.component.html',
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
	constructor(
		private categoriesService: CategoriesService,
		private storesService: StoresService
	) {
	}
	
	categories$: Observable<CategoryDTO[]> = this.categoriesService.getAll();
	stores$: Observable<StoreDTO[]> = this.storesService.getAll();
	links$: Observable<string[]> = of([
		'Company',
		'About',
		'Blog',
		'Help Center',
		'Our Value',
	]);
}
