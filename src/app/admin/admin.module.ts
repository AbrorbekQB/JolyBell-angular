import {NgModule} from "@angular/core";
import {AdminComponent} from "./admin/admin.component";
import {AdminLoginComponent} from './admin-login/admin-login.component';
import {AdminRoutingModule} from "./admin-routing.module";
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminLoginComponent,
    DashboardComponent
  ],
  imports: [
    AdminRoutingModule
  ],
  providers: []
})

export class AdminModule {
}
