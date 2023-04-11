import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-regist-login',
  templateUrl: './regist-login.component.html',
  styleUrls: ['./regist-login.component.css']
})
export class RegistLoginComponent {

  getRegData(data:NgForm){
    console.log(data);
  }
}
