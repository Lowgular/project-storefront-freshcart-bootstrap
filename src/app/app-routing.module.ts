import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StorePage } from './pages/store.page';
import { HomePage } from './pages/home.page';
import { CategoryPage } from './pages/category.page';
import { StorePageModule } from './pages/store.page-module';
import { HomePageModule } from './pages/home.page-module';
import { CategoryPageModule } from './pages/category.page-module';

const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'categories/:categoryId', component: CategoryPage },
  { path: 'stores/:storeId', component: StorePage },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    StorePageModule,
    HomePageModule,
    CategoryPageModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
