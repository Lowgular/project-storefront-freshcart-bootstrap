import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { ShopsByCategoriesComponentModule } from '../shops-by-categories/shops-by-categories.component-module';
import { StoresComponentModule } from '../stores/stores.component-module';
import { ProductsByCategoriesComponentModule } from '../products-by-categories/products-by-categories.component-module';

@NgModule({
  imports: [
    ShopsByCategoriesComponentModule,
    StoresComponentModule,
    ProductsByCategoriesComponentModule,
  ],
  declarations: [HomeComponent],
  providers: [],
  exports: [HomeComponent],
})
export class HomeComponentModule {}
