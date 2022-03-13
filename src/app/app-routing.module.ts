import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CategoryComponent } from './pages/category/category.component';
import { FaqComponent } from './pages/faq/faq.component';
import { ProductComponent } from './pages/product/product.component';

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
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
