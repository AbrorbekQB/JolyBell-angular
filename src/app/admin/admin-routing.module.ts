import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AdminComponent} from "./admin/admin.component";
import {AdminLoginComponent} from "./pages/admin-login/admin-login.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {OrdersComponent} from "./pages/orders/orders.component";
import {UsersComponent} from "./pages/users/users.component";

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'login',
        component: AdminLoginComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'orders',
        component: OrdersComponent
      },
      {
        path: 'users',
        component: UsersComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule {
}
