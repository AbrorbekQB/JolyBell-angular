import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './pages/home/home.component';
import {HeaderComponent} from './parts/header/header.component';
import {FooterComponent} from './parts/footer/footer.component';
import {CategoryComponent} from './pages/category/category.component';
import {CardComponent} from './parts/card/card.component';
import {FaqComponent} from './pages/faq/faq.component';
import {ProductComponent} from './pages/product/product.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {OrdersModalComponent} from './parts/orders-modal/orders-modal.component';
import {OrderComponent} from './pages/order/order.component';
import {ToastrModule} from "ngx-toastr";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AuthInterceptor} from "./shared/interceptor/authInterceptor";
import { AccountComponent } from './pages/account/account.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CategoryComponent,
    CardComponent,
    FaqComponent,
    ProductComponent,
    OrdersModalComponent,
    OrderComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
