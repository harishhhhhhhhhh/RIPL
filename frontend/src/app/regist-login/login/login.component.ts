import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators ,ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  myForm!: FormGroup;

  constructor(private fb: FormBuilder,private router: Router) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  login(username: string, password: string) {
    if (username === 'admin' && password === 'admin') {
      // If the credentials are valid, retrieve the user's role
      const userRole = 'admin';
  
      // Store the user's role in the local storage
      localStorage.setItem('currentUserRole', userRole);
  
      // Redirect the user to the desired page
      // For example, if you have a dashboard page:
      this.router.navigate(['/playerselection']);
    } else {
      // If the credentials are invalid, show an error message
      alert('Invalid username or password');
    }
  }
  onSubmit() {
    this.login(this.myForm.value.username,this.myForm.value.password)
    console.log(this.myForm.value);
  }
}
