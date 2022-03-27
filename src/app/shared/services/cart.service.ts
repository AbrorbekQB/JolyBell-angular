import {Injectable} from "@angular/core"
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})

export class CartService {
  public totalCost = 0

  constructor(
    private apiService:ApiService
  ) {}

  public returnTotalCost(): number {
    return this.totalCost
  }

  public getTotalCost(cartId: any) {
    this.apiService.getTotalCostApi(cartId).subscribe(res => {
      this.totalCost = res.cost
    })
  }
}
