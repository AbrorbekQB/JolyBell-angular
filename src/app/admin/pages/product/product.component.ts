import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ApiService} from "../../../shared/services/api.service";
import {FormControl, FormGroup} from "@angular/forms";
import {NotificationService} from "../../../shared/services/notification.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Utils} from "../../../shared/services/Utils";

interface ImageUploadModel {
  Title: string;
  Description: string;
  ImageType: string;
  Base64String: string;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit {
  public productList: any = []
  public categoryList: any = [{}]
  public adviceList: any = []
  public descriptionList: any = []
  public images: any[] = []
  public componentState: string = ""
  public addProductCountId: string = ""
  public totalLength: any
  public page: number = 1
  public productId: string = ""
  public productDetails: any = {
    descriptionItems: [""]
  }

  public createProductForm = new FormGroup({
    images: new FormControl(''),
    name: new FormControl(''),
    cost: new FormControl(''),
    categoryId: new FormControl(''),
    advice: new FormControl(''),
    description: new FormControl([]),
    withSize: new FormControl(true)
  })

  public editProductForm = new FormGroup({
    // images: new FormControl(''),
    name: new FormControl(this.productDetails.name),
    cost: new FormControl(''),
    advice: new FormControl(),
    description: new FormControl([])
  })

  public searchCategoryFrom = new FormGroup({
    search: new FormControl('')
  })

  public addProductForm = new FormGroup({
    count: new FormControl(0)
  })

  constructor(private router: Router,
              private apiService: ApiService,
              private notifyService: NotificationService,
              private jwtHelper: JwtHelperService,
              private utils: Utils) {
  }


  ngOnInit(): void {
    this.utils.checkAuthenticated()
    this.updateProductList(this.searchCategoryFrom.value.search)
  }

  openModal(name: string, arg: any) {
    this.componentState = name
    switch (name) {
      case 'addToProductCount': {
        this.addProductCountId = arg
        break
      }
      case 'create': {
        this.apiService.getCategoryList().subscribe(res => {
          this.categoryList = res
        })
        break
      }
      case 'changeActive': {
        this.productId = arg
        document.body.style.overflow = 'hidden'
        break
      }
      case 'doEditProduct': {
        this.productId = arg

        this.apiService.getProductById(arg).subscribe(res => {
          this.productDetails = res
          let description = ""
          this.productDetails.descriptionItems.forEach((des: any) => {
            description += des.text + "\n";
          })
          this.productDetails.descriptionItems = description.trim()

          this.editProductForm.setValue({
            name: this.productDetails.name,
            cost: this.productDetails.cost,
            advice: this.productDetails.advice,
            description: this.productDetails.descriptionItems,
          })
        });
        document.body.style.overflow = 'hidden'
        this.componentState = 'editProduct'
        break
      }
      case 'editProduct': {
        break
      }
    }
  }

  closeModal() {
    this.componentState = ""
    this.addProductCountId = ""
    document.body.style.overflow = ''
  }

  onFileChange(event: any) {
    this.images = []
    for (let i = 0; i < event.target.files.length; i++) {
      this.images.push(event.target.files[i])
    }
  }

  createProductBtn() {
    if (this.createProductForm.value.description) {
      this.createProductForm.value.description = this.createProductForm.value.description.split(/\r?\n/)
    }

    let formData = new FormData()
    this.images.forEach((file) => {
      formData.append("files", file);
    })

    this.apiService.createProductByAdmin(this.createProductForm.value).subscribe(res => {
      this.notifyService.showSuccess("Successfully created!")
      this.apiService.updateProductImage(formData, res).subscribe((res) => {
        this.closeModal()
        this.createProductForm.reset()
        this.images = []
        this.updateProductList(this.searchCategoryFrom.value.search)
      });
    }, error => {
      this.notifyService.showError("Creation error!")
    })
  }

  updateProductList(search: string) {
    this.apiService.getAllProductList(search, this.page).subscribe(res => {
      this.productList = res.data
      this.totalLength = res.totalCount
    })
  }

  addToProductCount() {
    this.apiService.addToProductCount(this.addProductCountId, this.addProductForm.value.count).subscribe(res => {
      this.notifyService.showSuccess("Successfully added!")
      this.updateProductList(this.searchCategoryFrom.value.search)
      this.closeModal()
      this.addProductForm.reset()
    }, error => {
      this.notifyService.showError("adding error!")
    })
  }

  searching() {
    if (this.searchCategoryFrom.value.search.length >= 3)
      this.updateProductList(this.searchCategoryFrom.value.search)
    else {
      this.updateProductList("")
    }
  }

  fillList() {
    this.updateProductList(this.searchCategoryFrom.value.search)
  }

  changeActiveProduct(productId: string) {
    this.apiService.changeActiveProduct(productId).subscribe(res => {
      this.notifyService.showSuccess("Successfully updated!");
      this.closeModal()
      this.updateProductList("")
    }, error => {
      this.notifyService.showError("Can not update");
    })
  }

  // edit product
  editProductBtn(id: string) {
    this.apiService.editProduct({
      id: id,
      name: this.editProductForm.value.name,
      cost: this.editProductForm.value.cost,
      advice: this.editProductForm.value.advice,
      descriptionItems: this.editProductForm.value.description.split(/\r?\n/),
      imageItems: this.productDetails.imageItems
    }).subscribe(res => {
      this.notifyService.showSuccess("Successfully update!")
      this.updateProductList(this.searchCategoryFrom.value.search)
      this.closeModal()
    }, () => {
      this.notifyService.showError("Error updating!")
    })
  }

  removeImage(id: string) {
    let resultImages = []
    for (let index in this.productDetails.imageItems) {
      if (this.productDetails.imageItems[index].id != id) {
        resultImages.push(this.productDetails.imageItems[index])
      }
    }
    this.productDetails.imageItems = resultImages
  }
}
