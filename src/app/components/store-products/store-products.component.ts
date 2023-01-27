import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, map, shareReplay, switchMap, take, tap } from 'rxjs';
import { StoresService } from '../../services/stores.service';
import { ProductsService } from '../../services/products.service';
import { ProductModel } from '../../models/product.model';
import { StoreModel } from '../../models/store.model';

@Component({
  selector: 'app-store-products',
  styleUrls: ['./store-products.component.scss'],
  templateUrl: './store-products.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreProductsComponent implements OnInit {
  constructor(
    private _storesService: StoresService,
    private _activatedRoute: ActivatedRoute,
    private _productsService: ProductsService,
    private _router: Router
  ) {}

  readonly pageParams$: Observable<Params> = this._activatedRoute.params.pipe(
    map((params) => ({
      storeId: params['storeId'],
    })),
    shareReplay(1)
  );

  readonly storeProducts$: Observable<ProductModel[]> = this.pageParams$.pipe(
    switchMap((queryParams) => {
      return this._productsService
        .getAllProducts()
        .pipe(
          map((products) =>
            products.filter(
              (product) =>
                product.storeIds.indexOf(queryParams['storeId']) !== -1
            )
          )
        );
    })
  );

  readonly store$: Observable<StoreModel> = this.pageParams$.pipe(
    switchMap((params) => this._storesService.getStoreById(params['storeId'])),
    take(1),
    shareReplay(1)
  );

  ngOnInit() {
    this.pageParams$
      .pipe(
        take(1),
        tap((params) => {
          this._router.navigate([], params['storeId']);
        })
      )
      .subscribe();
  }
}
