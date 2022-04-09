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
    return this.http.post(this.url + '/auth/registration', {
      username,
      password
    })
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.url + '/auth/login', {
      username,
      password
    })
  }

  forgot(username: string): Observable<any> {
    return this.http.post(this.url + '/auth/forgot', {
      username
    })
  }

  // order
  createOrder(orderData: any): Observable<any> {
    return this.http.post(this.url + '/order/create', orderData)
  }

  updateOrder(orderId: string, orderData: any): Observable<any> {
    return this.http.post(this.url + '/order/update/' + orderId, orderData)
  }

  getTotalCostApi(cartId: any): Observable<any> {
    return this.http.get(this.url + `/order/get/${cartId}`)
  }

  getOrderById(orderId: string): Observable<any> {
    return this.http.get(`${this.url}/order/${orderId}`)
  }

  removeOrderItem(removeData: any): Observable<any> {
    return this.http.post(`${this.url}/order/remove/item`, removeData)
  }

  orderConfirm(orderId: any): Observable<any> {
    return this.http.get(`${this.url}/order/confirm/${orderId}`)
  }

  // product
  getProductsListApi(category: string): Observable<any> {
    return this.http.get(this.url + '/product/list/' + category)
  }

  postApi(cost: number): Observable<any> {
    return this.http.post(this.url + '/product/put', {
      cost
    })
  }

  getById(id: string): Observable<any> {
    return this.http.get(this.url + '/product/get/' + id)
  }

  // category
  getCategoryList(): Observable<any> {
    return this.http.get(this.url + '/category/list')
  }

  // user
  getUserDetails(): Observable<any> {
    return this.http.get(`${this.url}/user/get`)
  }

  // PromoCode

  checkPromocode(code: string, orderId: string): Observable<any> {
    return this.http.post(`${this.url}/promocode/check`, {
      orderId: orderId,
      code: code
    })

  }

  // for Admin
  // user
  getAllUser(): Observable<any> {
    return this.http.post(`${this.url}/admin/user/list`, {
      "draw": 1,
      "page": 0,
      "length": 10,
    })
  }
}
