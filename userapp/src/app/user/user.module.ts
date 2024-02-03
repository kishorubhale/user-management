import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserUpsertComponent } from './user-upsert/user-upsert.component';
import { UserListComponent } from './user-list/user-list.component';



@NgModule({
  declarations: [UserUpsertComponent, UserListComponent],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
