import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Status } from 'src/app/models/status.enum';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  statusList = [Status.ACTIVE, Status.INACTIVE];
  addUserForm = this.formBuilder.group({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    status: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const firstName = this.addUserForm.value.firstName;
    const lastName = this.addUserForm.value.lastName;
    const email = this.addUserForm.value.email;
    const password = this.addUserForm.value.password;
    const status = this.addUserForm.value.status;

    if (!firstName || !lastName || !email || !password || !status) {
      this.toast.error('Invalid input fields', 'Error');
      return;
    }

    const newAppUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      status: status,
      permissions: []
    };

    this.userService.createUser(newAppUser).subscribe(
      () => this.toast.success('User successfully created', 'Success'),
      () => this.toast.error('Error creating user', 'Error')
    );
  }

  get inputFieldsNotValid() {
    return !this.addUserForm.value.firstName
      || !this.addUserForm.value.lastName
      || !this.addUserForm.value.email
      || !this.addUserForm.value.password
      || !this.addUserForm.value.status;
  }
}
