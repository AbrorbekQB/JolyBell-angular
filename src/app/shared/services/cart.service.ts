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

  updateTotalAmountInCart(id: string) {
    if (id)
      this.apiService.getTotalAmountApi(id).subscribe(res => {
          this.totalAmount = res;
        }
      )
    if (!id && localStorage.getItem('cartId')) {
      this.apiService.getTotalAmountApi(localStorage.getItem('cartId')).subscribe(res => {
          this.totalAmount = res;
        }
      )
    } else {
      this.totalAmount = "0"
    }
  }
}
