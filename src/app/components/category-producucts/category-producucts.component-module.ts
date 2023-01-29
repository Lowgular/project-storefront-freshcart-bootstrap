import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryProducuctsComponent } from './category-producucts.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [CategoryProducuctsComponent],
  providers: [],
  exports: [CategoryProducuctsComponent]
})
export class CategoryProducuctsComponentModule {
}
