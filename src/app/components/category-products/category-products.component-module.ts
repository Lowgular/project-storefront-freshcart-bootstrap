import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryProductsComponent } from './category-products.component';

@NgModule({
  imports: [RouterModule],
  declarations: [CategoryProductsComponent],
  providers: [],
  exports: [CategoryProductsComponent]
})
export class CategoryProductsComponentModule {
}
