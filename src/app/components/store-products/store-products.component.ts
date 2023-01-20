import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest, map } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { StoreModel } from '../../models/store.model';
import { ProductModel } from '../../models/product.model';
import { StoresService } from '../../services/stores.service';
import { ProductsService } from '../../services/products.service';

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
  
  readonly storeProducts$: Observable<ProductModel[]> = combineLatest([
    this._productsService.getAll(),
    this.storeData$
  ]).pipe(
    map(([products, storeDetails] : [ProductModel[], StoreModel]) => 
    {return products.filter(product => product.storeIds.includes(storeDetails.id))})
  );

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _storesService: StoresService, private _productsService: ProductsService
  ) { }


}
