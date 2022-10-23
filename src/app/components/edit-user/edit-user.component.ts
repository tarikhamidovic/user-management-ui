import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppUser } from 'src/app/models/app-user.model';
import { Status } from 'src/app/models/status.enum';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  existingAppUser: AppUser = {
    id: 0,
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    status: '',
    permissions: []
  };
  statusList = [Status.ACTIVE, Status.INACTIVE];
  editUserForm = this.formBuilder.group({
    firstName: '',
    lastName: '',
    email: '',
    status: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const userId = Number(routeParams.get('userId'));

    this.userService.getUserById(userId).subscribe((appUser) => {
      this.existingAppUser = appUser;
      this.editUserForm.setValue({
        firstName: appUser.firstName,
        lastName: appUser.lastName,
        email: appUser.email,
        status: appUser.status
      });
    });
  }

  onSubmit() {
    this.existingAppUser.firstName = this.editUserForm.value.firstName!!
    this.existingAppUser.lastName = this.editUserForm.value.lastName!!
    this.existingAppUser.email = this.editUserForm.value.email!!
    this.existingAppUser.status = this.editUserForm.value.status!!

    this.userService.updateUser(this.existingAppUser).subscribe(
      (appUser) => {
        this.existingAppUser = appUser;
        this.toast.success('Successfully saved user settings', 'Success');
      },
      () => this.toast.error('There was an error saving user settings', 'Error')
    );
  }

  get inputFieldsValid() {
    return !this.editUserForm.value.firstName
      || !this.editUserForm.value.lastName
      || !this.editUserForm.value.email
      || !this.editUserForm.value.status;
  }

}
