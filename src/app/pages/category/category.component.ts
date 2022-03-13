import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from "../../shared/services/api.service";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
})

export class CategoryComponent implements OnInit {
    public categoryName: string = ""
    public productList: Array<any> = []
    public form: FormGroup = new FormGroup({
        cost: new FormControl('')
    })

    constructor(
        private route: ActivatedRoute,
        private apiService: ApiService,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
        this.route.params.subscribe((data: any) => {
            this.categoryName = data.categoryName
        })

        this.apiService.getProductsListApi().subscribe(res => {
            this.productList = res
        }, err => {
            console.log(err)
            this.router.navigate(['/']).then()
        })
    }

    formSubmit() {
        this.apiService.postApi(this.form.value.cost).subscribe(res => {
            console.log(res)
        })
    }
}
