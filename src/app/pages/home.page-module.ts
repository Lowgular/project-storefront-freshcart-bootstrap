import {NgModule} from '@angular/core';
import {HeaderComponentModule} from '../lib/src/lib/adapters/primary/components/header/header.component-module';
import {CategoriesServiceModule} from '../lib/src/lib/adapters/secondary/services/categories/categories.service-module';
import {FooterComponentModule} from '../lib/src/lib/adapters/primary/components/footer/footer.component-module';
import {StoresServiceModule} from '../lib/src/lib/adapters/secondary/services/stores/stores.service-module';
import {HomePage} from './home.page';

@NgModule({
  imports: [HeaderComponentModule, CategoriesServiceModule, FooterComponentModule, StoresServiceModule],
  declarations: [HomePage],
  providers: [],
  exports: [HomePage]
})
export class HomePageModule {
}
