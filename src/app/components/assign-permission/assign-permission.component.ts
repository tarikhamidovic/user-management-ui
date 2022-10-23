import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppUser } from 'src/app/models/app-user.model';
import { Permission } from 'src/app/models/permission.enum';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-assign-permission',
  templateUrl: './assign-permission.component.html',
  styleUrls: ['./assign-permission.component.scss']
})
export class AssignPermissionComponent implements OnInit {

  assignPermissionsForm = this.formBuilder.group({
    description: false,
    code: false
  });
  existingAppUser: AppUser = {
    id: 0,
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    status: '',
    permissions: []
  };
  existingPermissions: Permission[] = [];

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
      this.existingPermissions = appUser.permissions;
      this.assignPermissionsForm.setValue({
        description: this.hasPermission(Permission.Description),
        code: this.hasPermission(Permission.Code)
      });
    });
  }

  onSubmit() {
    const codePermission = this.assignPermissionsForm.value.code;
    const descriptionPermission = this.assignPermissionsForm.value.description;

    const newPermissions = [];
    if (codePermission) newPermissions.push(Permission.Code);
    if (descriptionPermission) newPermissions.push(Permission.Description);

    this.existingAppUser.permissions = newPermissions;
    this.userService.updateUser(this.existingAppUser).subscribe(
      (appUser) => {
        this.existingAppUser = appUser;
        this.existingPermissions = appUser.permissions;
        this.toast.success('Successfully updated permissions for user', 'Success');
      },
      () => this.toast.error('Error updating permissions for user', 'Error')
    );
  }

  private hasPermission(permission: Permission): boolean {
    return this.existingPermissions.includes(permission);
  }
}
