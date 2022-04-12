import {NgModule} from "@angular/core";
import {AdminComponent} from "./admin/admin.component";
import {AdminLoginComponent} from './pages/admin-login/admin-login.component';
import {AdminRoutingModule} from "./admin-routing.module";
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {SidebarComponent} from './parts/sidebar/sidebar.component';
import {NavbarComponent} from './parts/navbar/navbar.component';
import {OrdersComponent} from './pages/orders/orders.component';
import {UsersComponent} from './pages/users/users.component';
import {CommonModule} from "@angular/common";
import {UserListComponent} from './parts/user-list/user-list.component';
import {UserCreateComponent} from './parts/user-create/user-create.component';
import {PaginationComponent} from './parts/pagination/pagination.component';
import {NgxPaginationModule} from "ngx-pagination";
import {ReactiveFormsModule} from "@angular/forms";
import { ProductComponent } from './pages/product/product.component';
import { CategoryComponent } from './pages/category/category.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminLoginComponent,
    DashboardComponent,
    SidebarComponent,
    NavbarComponent,
    OrdersComponent,
    UsersComponent,
    UserListComponent,
    UserCreateComponent,
    PaginationComponent,
    ProductComponent,
    CategoryComponent
  ],
  imports: [
    NgxPaginationModule,
    AdminRoutingModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: []
})

export class AdminModule {
}
