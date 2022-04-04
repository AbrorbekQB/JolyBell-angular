import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {CategoryComponent} from './pages/category/category.component';
import {FaqComponent} from './pages/faq/faq.component';
import {ProductComponent} from './pages/product/product.component';
import {OrderComponent} from "./pages/order/order.component";
import {AccountComponent} from "./pages/account/account.component";
import {PurchaseComponent} from "./pages/purchase/purchase.component";
import {OrdersCheckoutComponent} from "./pages/orders-checkout/orders-checkout.component";

const routes: Routes = [{
  path: '',
  component: HomeComponent
}, {
  path: 'category/:categoryName',
  component: CategoryComponent
}, {
  path: 'faq',
  component: FaqComponent
}, {
  path: 'product/:id',
  component: ProductComponent
}, {
  path: 'order/:id',
  component: OrderComponent
}, {
  path: 'account',
  component: AccountComponent
}, {
  path: 'purchase',
  component: PurchaseComponent
}, {
  path: 'orders/checkout',
  component: OrdersCheckoutComponent
}, {
  path: 'admin',
  loadChildren: () => import('./admin/admin.module').then(module => module.AdminModule),
  // canActivate: [ SuperAdminAdminGuard ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
