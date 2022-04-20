import {Injectable} from "@angular/core"
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})

export class CartService {
  public totalAmount = "0"

  constructor(
    private apiService: ApiService
  ) {
  }

  public returnTotalCost(): any {
    return this.totalAmount
  }

  updateTotalAmountInCart() {
    if (localStorage.getItem('cartId')) {
      this.apiService.getTotalAmountApi(localStorage.getItem('cartId')).subscribe(res => {
          this.totalAmount = res;
        }
      )
    }
  }
}
