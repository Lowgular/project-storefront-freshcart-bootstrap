import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryProducuctsComponent } from './category-producucts.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  declarations: [CategoryProducuctsComponent],
  providers: [],
  exports: [CategoryProducuctsComponent],
})
export class CategoryProducuctsComponentModule {}
