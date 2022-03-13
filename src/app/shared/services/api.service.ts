import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    constructor(
        private http: HttpClient
    ) {

    }

    getProductsListApi(): Observable<any> {
        return this.http.get('http://localhost:8080/product/list')
    }

    postApi(cost: number): Observable<any> {
        return this.http.post('http://localhost:8080/product/put', {
            cost
        })
    }
}
