import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { StoreModel } from 'src/app/models/store.model';
import { StoreWithDistanceKmQueryModel } from 'src/app/query-models/store-with-distance-km.query-model';
import { StoresService } from '../../services/stores.service';

@Component({
  selector: 'app-store-products',
  styleUrls: ['./store-products.component.scss'],
  templateUrl: './store-products.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreProductsComponent {
  readonly store$: Observable<StoreWithDistanceKmQueryModel> =
    this._activatedRoute.params.pipe(
      switchMap((params) =>
        this._storesService.getOneStore(params['storeId']).pipe(
          map((store) => ({
            ...store,
            distance: store.distanceInMeters / 1000,
          }))
        )
      )
    );
  readonly search: FormControl = new FormControl();

  constructor(
    private _storesService: StoresService,
    private _activatedRoute: ActivatedRoute
  ) {}
}
