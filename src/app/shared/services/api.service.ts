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

  getTotalAmountApi(cartId: any): Observable<any> {
    return this.http.get(this.url + `/order/amount/${cartId}`,
      {responseType: 'text'})
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

  getCategoryById(id: string): Observable<any> {
    return this.http.get(`${this.url}/category/get/${id}`)
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

  createAdminUser(data: any): Observable<any> {
    return this.http.post(`${this.url}/admin/user/create`, {
      firstname: data.firstname,
      lastname: data.lastname,
      patronymic: data.patronymic,
      username: data.username,
      password: data.password,
      phoneNumber: data.phoneNumber
    })
  }

  // category
  getCategoryListByAdmin(search: string, page: number): Observable<any> {
    return this.http.post(this.url + '/admin/category/list', {
      "page": page,
      "filterData": {
        "search": search
      }
    })
  }

  changeActiveCategory(id: string) {
    return this.http.get(`${this.url}/admin/category/change/active/${id}`)
  }

  updateCategoryByAdmin(id: string, name: string) {
    return this.http.post(`${this.url}/admin/category/edit`, {
      "id": id,
      "name": name
    })
  }

  createCategoryByAdmin(name: string) {
    return this.http.post(`${this.url}/admin/category/create`, {
      "name": name
    })
  }

  // Product
  createProductByAdmin(data: any) {
    return this.http.post(`${this.url}/admin/product/create`,
      {
        "name": data.name,
        "cost": data.cost,
        "imagesItems": data.images,
        "descriptionItems": data.description,
        "count": data.count,
        "advice": data.advice,
        "categoryId": data.categoryId,
        "withSize": data.withSize
      },
      {responseType: 'text'})
  }

  updateProductImage(images: FormData, productId: string): Observable<any> {
    return this.http.post(`${this.url}/admin/product/update/image/${productId}`, images)
  }

  getAllProductList(search: string, page: number): Observable<any> {
    return this.http.post(`${this.url}/admin/product/list`, {
      "page": page,
      "filterData": {
        "search": search
      }
    })
  }

  addToProductCount(id: string, count: number): Observable<any> {
    return this.http.post(`${this.url}/admin/product/add`, {
      "id": id,
      "count": count
    })
  }

  changeActiveProduct(productId: string) {
    return this.http.get(`${this.url}/admin/product/change/active/${productId}`)
  }

  getProductById(id: string): Observable<any> {
    return this.http.get(`${this.url}/admin/product/get/${id}`)
  }
}
