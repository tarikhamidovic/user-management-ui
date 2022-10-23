import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignPermissionComponent } from './assign-permission/assign-permission.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'edit-user/:userId', component: EditUserComponent},
  { path: 'assign-permission/:userId', component: AssignPermissionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
