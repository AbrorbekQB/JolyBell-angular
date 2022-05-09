import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
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
    return this.http.post(this.url + '/user/forgot/password', {
      username
    })
  }

  verifyForgot(confirmCode: string, password: string) {
    return this.http.post(this.url + '/user/verify/password', {
      confirmCode,
      password
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

  getOrderById(orderId: string, status: string): Observable<any> {
    return this.http.post(`${this.url}/order/get`, {
      "id": orderId,
      "status": status
    })
  }

  getOrderList(): Observable<any> {
    return this.http.get(`${this.url}/order/list`)
  }

  removeOrderItem(removeData: any): Observable<any> {
    return this.http.post(`${this.url}/order/remove/item`, removeData)
  }

  orderConfirm(orderId: any): Observable<any> {
    return this.http.get(`${this.url}/order/confirm/${orderId}`,
      {responseType: 'text'})
  }

  cancelOrder(orderId: string) {
    return this.http.get(`${this.url}/order/cancel/${orderId}`)
  }

  checkout(data: any) {
    console.log(data)
    return this.http.post(`${this.url}/order/checkout`, {
        user: {
          "patronymic": data.patronymic,
          "phoneNumber": data.phoneNumber,
          "address": data.address,
          "province": data.province,
          "surname": data.surname,
          "district": data.district,
          "name": data.name,
          "username": data.email,
        },
        note: data.note,
        orderId: localStorage.getItem('orderId')
      },
      {responseType: 'text'})
  }


  choicePayment(orderId: string, type: string) {
    return this.http.post(`${this.url}/order/choice-payment`, {
      orderId: orderId,
      type: type
    })
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

  updateAddress(personalInfo: any) {
    return this.http.post(`${this.url}/user/update-address`, {
      "district": personalInfo.district,
      "province": personalInfo.province,
      "address": personalInfo.address
    })
  }

  updatePersonalData(value: any) {
    return this.http.post(`${this.url}/user/update`, {
      "firstname": value.firstname,
      "lastname": value.lastname,
      "patronymic": value.patronymic,
      "phoneNumber": value.phoneNumber
    })
  }

  changePassword(value: any) {
    return this.http.post(`${this.url}/user/change/password`, {
      password: value.password,
      confirmPassword: value.confirmPassword
    })
  }

  // PromoCode

  checkPromocode(code: string, orderId: string): Observable<any> {
    return this.http.post(`${this.url}/promocode/check`, {
      orderId: orderId,
      code: code
    })

  }

  // Handbook
  provinceList() {
    return this.http.get(`${this.url}/handbook/province`)
  }

  districtList(provinceId: string) {
    return this.http.get(`${this.url}/handbook/district/${provinceId}`)
  }


  // for Admin
  // user
  getAllUser(search: string, page: number): Observable<any> {
    return this.http.post(`${this.url}/admin/user/list`, {
      "page": page,
      "length": 10,
      "filterData": {
        "search": search
      }
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

  changeActiveUser(id: any) {
    return this.http.get(`${this.url}/admin/user/change/active/${id}`)
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


  editProduct(param: any) {
    return this.http.post(`${this.url}/admin/product/edit`, param)
  }

  // payment

  payOrder(orderId: string, value: any) {
    return this.http.post(`${this.url}/paysys/pay`, {
      orderId: orderId,
      cardHolderName: value.cardHolderName,
      cardNumber: value.cardNumber,
      cardExpire: value.cardExpire,
      cardCvc: value.cardCvc
    })
  }

  // order
  getOrderListByAdmin(filter: any, page: number): Observable<any> {
    return this.http.post(this.url + '/admin/order/list', {
      "page": page,
      "filterData": filter
    })
  }

  acceptOrder(id: string) {
    return this.http.get(`${this.url}/admin/order/accept/${id}`)
  }

  // Dashboard
  dashboardUser() {
    return this.http.get(`${this.url}/admin/dashboard/user`)
  }

  dashboardOrder() {
    return this.http.get(`${this.url}/admin/dashboard/order`)
  }
}
