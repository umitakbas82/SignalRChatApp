import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  userForm:FormGroup=new FormGroup({});
  submitted=false;
  constructor( private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    this.intializeForm();
  }


  intializeForm(){
    this.userForm=this.formbuilder.group({
      name:["",Validators.required,Validators.minLength(3),Validators.maxLength(15)]
      
    })
    console.log("click")
  }

  submitForm(){
    this.submitted=true;
    if(this.userForm.valid){
      console.log(this.userForm.value)
    }

  }
}
