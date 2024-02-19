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
  openChat=false;
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
          this.service.myName=this.userForm.get('name')?.value;
          this.openChat=true;
          this.userForm.reset();
          this.submitted=false;
        },
        error:error=>{
          if (typeof(error.error)!== 'object'){
            this.apiErrorMessages.push(error.error);
          }
        }
      })
    }

  }

  closeChat(){
    this.openChat=false;
  }
}
