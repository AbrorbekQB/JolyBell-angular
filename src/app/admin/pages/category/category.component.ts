import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../../../shared/services/api.service";
import {NotificationService} from "../../../shared/services/notification.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  public createCategoryModal: boolean = false
  public changeActiveCategoryModal: boolean = false
  public editCategoryModal: boolean = false
  public categoryId: string = ""
  public categoryName: string = ""
  public categoryList: any = [{
    id: "",
    active: "",
    name: "",
    url: "",
    createDate: "",
    username: ""
  }]

  public editCategoryForm = new FormGroup({
    name: new FormControl(this.categoryName)
  })

  public createCategoryForm = new FormGroup({
    name: new FormControl('')
  })

  public searchCategoryFrom = new FormGroup({
    search: new FormControl('')
  })

  public activeRoute: string = ""

  constructor(private route: ActivatedRoute,
              private apiService: ApiService,
              private notifyService: NotificationService) {
  }

  ngOnInit(): void {
    this.updateCategoryTable("")
  }

  updateCategoryTable(search: string) {
    this.apiService.getCategoryListByAdmin(search).subscribe(res => {
      this.categoryList = res
    })
  }

  changeRoute(activeRoute: string) {
    this.activeRoute = activeRoute;
    this.updateCategoryTable("")
  }

  openCreateCategoryModal() {
    this.createCategoryModal = true
    document.body.style.overflow = 'hidden'
  }

  closeModal() {
    document.body.style.overflow = ''
    this.createCategoryModal = false
    this.changeActiveCategoryModal = false
    this.editCategoryModal = false
  }

  openChangeActiveCategoryModal(id: string) {
    this.categoryId = id
    this.changeActiveCategoryModal = true
    document.body.style.overflow = 'hidden'
  }

  openEditCategoryModal(id: string) {
    this.apiService.getCategoryById(id).subscribe(res => {
      this.categoryName = res.name;
      this.editCategoryForm.value.name = this.categoryName
    })
    this.categoryId = id
    this.editCategoryModal = true
    document.body.style.overflow = 'hidden'
  }

  editCategory(id: string) {
    this.apiService.updateCategoryByAdmin(id, this.editCategoryForm.value.name).subscribe(res => {
      this.notifyService.showSuccess("Successfully update");
      this.updateCategoryTable("")
      this.closeModal()
    }, error => {
      this.notifyService.showError("Can not update category!")
      this.closeModal()
    })
  }

  changeActiveCategory(id: string) {
    this.apiService.changeActiveCategory(id).subscribe(res => {
      this.notifyService.showSuccess("Successfully updated!");
      this.changeActiveCategoryModal = false
      document.body.style.overflow = ''
      this.updateCategoryTable("")
    }, error => {
      this.notifyService.showError("Can not update");
      this.changeActiveCategoryModal = false
      this.updateCategoryTable("")
      document.body.style.overflow = ''
    })
  }

  createCategory() {
    this.apiService.createCategoryByAdmin(this.createCategoryForm.value.name).subscribe(res => {
      this.notifyService.showSuccess("Successfully updated!");
      this.createCategoryModal = false
      document.body.style.overflow = ''
      this.updateCategoryTable("")
    }, error => {
      this.notifyService.showError("Can not update");
      this.createCategoryModal = false
      this.updateCategoryTable("")
      document.body.style.overflow = ''
    })
  }

  searching() {
    if (this.searchCategoryFrom.value.search.length >= 3)
      this.updateCategoryTable(this.searchCategoryFrom.value.search)
    else {
      this.updateCategoryTable("")
    }
  }
}
