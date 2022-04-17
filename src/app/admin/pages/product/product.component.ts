import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../../../shared/services/api.service";
import {FormControl, FormGroup} from "@angular/forms";
import {NotificationService} from "../../../shared/services/notification.service";

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
  public productId: string = "";
  public productDetails: any = []

  public createProductForm = new FormGroup({
    images: new FormControl(''),
    name: new FormControl(''),
    cost: new FormControl(''),
    categoryId: new FormControl(''),
    advice: new FormControl(''),
    description: new FormControl([]),
    withSize: new FormControl(true)
  })

  public searchCategoryFrom = new FormGroup({
    search: new FormControl('')
  })

  public addProductForm = new FormGroup({
    count: new FormControl(0)
  })

  constructor(private route: ActivatedRoute,
              private apiService: ApiService,
              private notifyService: NotificationService) {
  }


  ngOnInit(): void {
    this.updateProductList(this.searchCategoryFrom.value.search)
  }

  openCreateProductModal() {
    this.componentState = "create"
    this.apiService.getCategoryList().subscribe(res => {
      this.categoryList = res
    })
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
      case 'editProduct': {
        this.productId = arg
        document.body.style.overflow = 'hidden'
        this.apiService.getProductById(arg).subscribe(res => {
          console.log(res)
        });
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
}
