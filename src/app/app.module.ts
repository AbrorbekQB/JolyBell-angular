import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './parts/header/header.component';
import { FooterComponent } from './parts/footer/footer.component';
import { CategoryComponent } from './pages/category/category.component';
import { CardComponent } from './parts/card/card.component';
import { FaqComponent } from './pages/faq/faq.component';
import { ProductComponent } from './pages/product/product.component';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { OrdersModalComponent } from './parts/orders-modal/orders-modal.component';
import { SignInModalComponent } from './parts/signin-modal/signin-modal.component';

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
        SignInModalComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
