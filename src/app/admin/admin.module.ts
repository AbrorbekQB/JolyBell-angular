import {NgModule} from "@angular/core";
import {AdminComponent} from "./admin/admin.component";
import {AdminLoginComponent} from './pages/admin-login/admin-login.component';
import {AdminRoutingModule} from "./admin-routing.module";
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent } from './parts/sidebar/sidebar.component';
import { NavbarComponent } from './parts/navbar/navbar.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { UsersComponent } from './pages/users/users.component';
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    AdminComponent,
    AdminLoginComponent,
    DashboardComponent,
    SidebarComponent,
    NavbarComponent,
    OrdersComponent,
    UsersComponent
  ],
  imports: [
    AdminRoutingModule,
    CommonModule
  ],
  providers: []
})

export class AdminModule {
}
