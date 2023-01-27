import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { StoreModel } from 'src/app/models/store.model';
import { StoresService } from '../../services/stores.service';

@Component({
  selector: 'app-store-products',
  styleUrls: ['./store-products.component.scss'],
  templateUrl: './store-products.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreProductsComponent {
  readonly store$: Observable<StoreModel> = this._activatedRoute.params.pipe(
    switchMap((params) => this._storesService.getOneStore(params['storeId']))
  );

  constructor(
    private _storesService: StoresService,
    private _activatedRoute: ActivatedRoute
  ) {}
}
