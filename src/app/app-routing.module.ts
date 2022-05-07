import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {CategoryComponent} from './pages/category/category.component';
import {FaqComponent} from './pages/faq/faq.component';
import {ProductComponent} from './pages/product/product.component';
import {OrderComponent} from "./pages/order/order.component";
import {AccountComponent} from "./pages/account/account.component";
import {PurchaseComponent} from "./pages/purchase/purchase.component";
import {BookingComponent} from "./pages/booking/booking.component";
import {ChoicePaymentComponent} from "./pages/choise-payment/choice-payment.component";
import {PaysysComponent} from "./pages/paysys/paysys.component";
import {YourOrdersComponent} from "./pages/your-orders/your-orders.component";
import {VerifyComponent} from "./pages/verify/verify.component";

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
  path: 'booking/details',
  component: BookingComponent
}, {
  path: 'paysys',
  component: PaysysComponent
}, {
  path: 'booking/choice-payment',
  component: ChoicePaymentComponent
}, {
  path: 'your-orders',
  component: YourOrdersComponent
}, {
  path: 'verify-user',
  component: VerifyComponent
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
