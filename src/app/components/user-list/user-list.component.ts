import { Component, OnInit, TemplateRef } from '@angular/core';
import { AppUser } from 'src/app/models/app-user.model';
import { UserService } from 'src/app/services/user.service';

import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  appUsers: AppUser[] = [];
  pageNumber: number = 0;
  totalPages: number = 0;
  totalElements: number = 0;
  elementsPerPage: number = 0;
  sortBy: string = '';
  modalRef?: BsModalRef;
  userIdToDelete = -1;
  filterUsersForm = this.formBuilder.group({
    filterInput: ''
  });

  constructor(
    private userService: UserService,
    private modalService: BsModalService,
    private toast: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.refreshUserList();
  }

  pageChanged(event: PageChangedEvent) {
    this.pageNumber = event.page - 1;
    this.refreshUserList();
  }

  sortUsersBy(sortingAttribue: string) {
    this.sortBy = sortingAttribue;
    this.refreshUserList();
  }

  openDeleteConfirmationModal(template: TemplateRef<any>, userId: number) {
    this.userIdToDelete = userId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
 
  confirm(): void {
    this.deleteUser(this.userIdToDelete);
    this.modalRef?.hide();
    this.userIdToDelete = -1;
  }
 
  decline(): void {
    this.modalRef?.hide();
    this.userIdToDelete = -1;
  }

  onSubmit() {
    const filterString = this.filterUsersForm.value.filterInput;
    if (!filterString) {
      return;
    }

    console.log('this should filter users by attribute...');
  }

  get inputFieldNotValid() {
    return !this.filterUsersForm.value.filterInput;
  }

  private refreshUserList() {
    this.userService.getUsers(this.pageNumber, this.sortBy)
      .subscribe((pageResponse) => {
        this.appUsers = pageResponse.content
        this.totalPages = pageResponse.totalPages;
        this.totalElements = pageResponse.totalElements;
        this.elementsPerPage = pageResponse.size;
      });
  }

  private deleteUser(id: number) {
    this.userService.deleteUserById(id)
      .subscribe(
        () => {
          this.toast.success('Successfully deleted user', 'Success');
          this.refreshUserList();
        },
        (error) => this.toast.error('Failed to delete user', "Error")
      );
  }
}
