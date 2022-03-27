import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(
    private http: HttpClient
  ) {

  }

  // order
  createOrder(orderData: any): Observable<any> {
    return this.http.post('http://localhost:8080/order/create', orderData)
  }

  updateOrder(orderData: any): Observable<any> {
    return this.http.post('http://localhost:8080/order/update', orderData)
  }

  getTotalCostApi(cartId: any): Observable<any> {
    return this.http.get(`http://localhost:8080/order/get/${cartId}`)
  }

  // product
  getProductsListApi(): Observable<any> {
    return this.http.get('http://localhost:8080/product/list')
  }

  postApi(cost: number): Observable<any> {
    return this.http.post('http://localhost:8080/product/put', {
      cost
    })
  }

  getById(id: string): Observable<any> {
    return this.http.get('http://localhost:8080/product/get/' + id)
  }

  // category
  getCategoryList(): Observable<any> {
    return this.http.get('http://localhost:8080/category/list')
  }

  // user and auth
  login(username: string, password: string): Observable<any> {
    return this.http.post('http://localhost:8080/user/login', {
      username,
      password
    })
  }

  forgot(username: string): Observable<any> {
    return this.http.post('http://localhost:8080/auth/forgot', {
      username
    })
  }
}
