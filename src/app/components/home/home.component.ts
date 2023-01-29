import {
	ChangeDetectionStrategy,
	Component,
	ViewEncapsulation,
} from "@angular/core";
import { map, Observable, reduce, shareReplay } from "rxjs";
import { CategoryModel } from "../../models/category.model";
import { StoreModel } from "../../models/store.model";
import { StoreTagModel } from "../../models/store-tag.model";
import { CategoriesService } from "../../services/categories.service";
import { StoresService } from "../../services/stores.service";
import { StoreTagsService } from "../../services/store-tags.service";


@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.css"],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
	readonly categories$: Observable<CategoryModel[]> = this._categoriesService
		.getAll()
		.pipe(shareReplay(1));

	readonly stores$: Observable<StoreModel[]> = this._storesService
		.getAll()
		.pipe(shareReplay(1));

	readonly storeTags$: Observable<StoreTagModel[]> =
		this._storeTagsService.getAll();

	readonly storeTagsMap$ = this.storeTags$.pipe(
		map((storeTags: StoreTagModel[]) => {
			return storeTags.reduce((a, c) => {
				return { ...a, [c.id]: c };
			}, {}) as Record<string, StoreTagModel>;
		})
	);

	constructor(
		private _categoriesService: CategoriesService,
		private _storesService: StoresService,
		private _storeTagsService: StoreTagsService

	) {}
}
