import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data-service.service';
import { User } from '../user.modal';

@Component({
  selector: 'app-user-upsert',
  templateUrl: './user-upsert.component.html',
  styleUrls: ['./user-upsert.component.css']
})
export class UserUpsertComponent implements OnInit {
  userform:FormGroup;
  userId: number;
  isEdit: boolean = false;
  isUserExist: boolean = false;
  constructor(private formBuilder: FormBuilder, private dataService: DataService, 
  private route: ActivatedRoute,
  private router: Router) {
    this.toCreate();
   }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        // If ID is present, set the component in edit mode
        this.isEdit = true;
        this.userId = id;
        const existingUser = this.dataService.getUserById(id);
        if (existingUser) {
          // If user exists, populate the form with user details
          this.userform.setValue({
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
            address: existingUser.address,
            email: existingUser.email,
            phone: existingUser.phone
          });
        } else {
          // If user does not exist, navigate to user list
          this.router.navigate(['/user-list']);
        }
      }
    });
  }
  toCreate(){
    this.userform=this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });
}
onSubmit(){
  if (this.userform.valid) {
    const user: User = this.userform.value;

    if (this.isEdit) {
      // Update existing user
      user.id = this.userId;
      
    } else {
      // Add new user
      user.id = this.generateUniqueId();
    }

    this.dataService.addUser(user);
    this.router.navigate(['/user-list']);
  } 
    

  
}
private generateUniqueId(): number {
  // Generate a unique ID 
  return Math.floor(Math.random() * 1000);
}
//check already user exits
checkUser(event){
  let username = event.target.value;
  this.isUserExist = this.dataService.checkUser(username);
}
  
}

