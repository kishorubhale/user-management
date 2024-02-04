import { Injectable } from '@angular/core';
import { User } from './user.modal';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private users: User[] = [];

  constructor() { 
    this.users = [
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', phone: '1234567890',address:'pune' },
      { id: 2, firstName: 'stev', lastName: 'job', email: 'stev@example.com', phone:'1234567856',address:'mumbai' },
      { id: 3, firstName: 'Jenny', lastName: 'Doe', email: 'jenny@abc.com', phone: '1234534890',address:'Jalgaon' },
      { id: 4, firstName: 'ram', lastName: 'mali', email: 'ram@test.com', phone: '1298567890',address:'kolhapur' },
      
    ];
  }
  getUsers(): User[] {
    return this.users;
  }

  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  addUser(user: User): void {
    // Check if the user already exists
    const existingUser = this.users.find(u => u.firstName.toLowerCase() === user.firstName.toLowerCase());
    if (existingUser) {
      // Update existing user
      Object.assign(existingUser, user);
    } else {
      // Add new user
      this.users.push(user);
    }
  }
  checkUser(userName){
     // Check if the user already exists
     const existingUser = this.users.find(u => u.firstName.toLowerCase() === userName.toLowerCase());
     if (existingUser) {
       return true;
     } else {
       return false;
     }
  }
  updateUser(updatedUser: User): void {
    // Find the user by ID
    const existingUser = this.users.find(user => user.id === updatedUser.id);

    // Check if the user exists
    if (existingUser) {
      // Update existing user
      Object.assign(existingUser, updatedUser);
    } else {
      // Handle error or log a message (user not found)
      console.error('User not found for update:', updatedUser);
    }
  }
  deleteUser(id: number): void {
    const index = this.users.findIndex(user => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }
}

