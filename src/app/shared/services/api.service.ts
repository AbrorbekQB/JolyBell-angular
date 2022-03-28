import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private url: string = 'http://localhost:8080'
  constructor(
    private http: HttpClient
  ) {

  }

  // auth
  registration(username: string, password: string): Observable<any> {
    return this.http.post(this.url+'/auth/registration', {
      username,
      password
    })
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.url+'/auth/login', {
      username,
      password
    })
  }

  forgot(username: string): Observable<any> {
    return this.http.post(this.url+'/auth/forgot', {
      username
    })
  }

  // order
  createOrder(orderData: any): Observable<any> {
    return this.http.post(this.url+'/order/create', orderData)
  }

  updateOrder(orderData: any): Observable<any> {
    return this.http.post(this.url+'/order/update', orderData)
  }

  getTotalCostApi(cartId: any): Observable<any> {
    return this.http.get(this.url+`/order/get/${cartId}`)
  }

  // product
  getProductsListApi(): Observable<any> {
    return this.http.get(this.url+'/product/list')
  }

  postApi(cost: number): Observable<any> {
    return this.http.post(this.url+'/product/put', {
      cost
    })
  }

  getById(id: string): Observable<any> {
    return this.http.get(this.url+'/product/get/' + id)
  }

  // category
  getCategoryList(): Observable<any> {
    return this.http.get(this.url+'/category/list')
  }

  // user
  getUserDetails(): Observable<any> {
    return this.http.get(`${this.url}/user/get`)
  }

}
