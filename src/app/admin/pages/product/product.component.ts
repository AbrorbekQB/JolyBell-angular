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

  public createProductForm = new FormGroup({
    images: new FormControl(''),
    name: new FormControl(''),
    cost: new FormControl(''),
    categoryId: new FormControl(''),
    advice: new FormControl(''),
    description: new FormControl([]),
    withSize: new FormControl(true)
  })

  public addProductForm = new FormGroup({
    count: new FormControl(0)
  })

  constructor(private route: ActivatedRoute,
              private apiService: ApiService,
              private notifyService: NotificationService) {
  }


  ngOnInit(): void {
    this.updateProductList()
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
    }
  }

  closeModal() {
    this.componentState = ""
    this.addProductCountId = ""
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
        this.updateProductList()
      });
    }, error => {
      this.notifyService.showError("Creation error!")
    })
  }

  updateProductList() {
    this.apiService.getAllProductList().subscribe(res => {
      this.productList = res
    })
  }

  addToProductCount() {
    this.apiService.addToProductCount(this.addProductCountId, this.addProductForm.value.count).subscribe(res => {
      this.notifyService.showSuccess("Successfully added!")
      this.updateProductList()
      this.closeModal()
      this.addProductForm.reset()
    }, error => {
      this.notifyService.showError("adding error!")
    })
  }
}
