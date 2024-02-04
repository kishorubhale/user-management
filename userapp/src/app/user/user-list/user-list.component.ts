import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-service.service';
import { Router } from '@angular/router';
import { User } from '../user.modal';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.users = this.userService.getUsers();
  }

  editUser(user: User): void {
    this.router.navigate(['/user-upsert', user.id]);
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id);
    // Optionally, update the user list after deletion
    this.users = this.userService.getUsers();
  }


}
