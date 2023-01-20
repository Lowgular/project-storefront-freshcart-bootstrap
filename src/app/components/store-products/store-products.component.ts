import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { StoreModel } from '../../models/store.model';
import { StoresService } from '../../services/stores.service';

@Component({
  selector: 'app-store-products',
  styleUrls: ['./store-products.component.scss'],
  templateUrl: './store-products.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreProductsComponent {
  readonly storeData$: Observable<StoreModel> =
    this._activatedRoute.params.pipe(
      switchMap((data) => this._storesService.getOne(data['storeId']))
    );
  readonly search: FormControl = new FormControl();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _storesService: StoresService
  ) { }

 
}
