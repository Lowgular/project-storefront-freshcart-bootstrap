import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryProducuctsComponent } from './components/category-producucts/category-producucts.component';
import { HomeComponent } from './components/home/home.component';
import { StoreProductsComponent } from './components/store-products/store-products.component';
import { CategoryProducuctsComponentModule } from './components/category-producucts/category-producucts.component-module';
import { HomeComponentModule } from './components/home/home.component-module';
import { StoreProductsComponentModule } from './components/store-products/store-products.component-module';

const routes: Routes = [
  { path: 'categories/:categoryId', component: CategoryProducuctsComponent },
  { path: '', component: HomeComponent },
  { path: 'stores/:storeId', component: StoreProductsComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CategoryProducuctsComponentModule,
    HomeComponentModule,
    StoreProductsComponentModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
