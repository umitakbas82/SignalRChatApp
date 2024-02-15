import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  userForm:FormGroup=new FormGroup({});
  submitted=false;
  apiErrorMessages:string[]=[];
  constructor( private formbuilder:FormBuilder, private service:ChatService) { }

  ngOnInit(): void {
     this.intializeForm();
  }


  intializeForm(){
    this.userForm=this.formbuilder.group({
      name:["",[Validators.required,Validators.minLength(3),Validators.maxLength(15)]]
      
    })
    console.log("click")
  }

  submitForm(){
    this.submitted=true;
    this.apiErrorMessages =[];
    if(this.userForm.valid){
      this.service.registerUser(this.userForm.value).subscribe({
        next:()=>{
          console.log("OPEN CHAT")
        },
        error:error=>{
          if (typeof(error.error)!== 'object'){
            this.apiErrorMessages.push(error.error);
          }
        }
      })
    }

  }
}
