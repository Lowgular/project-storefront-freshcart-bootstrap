import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreProductsComponent } from './store-products.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [StoreProductsComponent],
  providers: [],
  exports: [StoreProductsComponent],
})
export class StoreProductsComponentModule {}
