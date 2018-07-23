import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import axios from 'axios';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  modalForm: FormGroup;
  registerForm: FormGroup;
  constructor(public fb: FormBuilder) {
    this.modalForm = fb.group({
      modalFormNameEx: ['', Validators.required],
      modalFormEmailEx: ['', [Validators.email, Validators.required]],
      modalFormSubjectEx: ['', [Validators.required, Validators.minLength(8)]],
      modalFormTextEx: ['', [Validators.required, Validators.minLength(8)]]

    });
    this.registerForm = fb.group({
      orangeFormName: ['', Validators.required],
      orangeFormPass: ['', [Validators.required, Validators.minLength(8)]]
    });
  }


  ngOnInit() {

  }
  submit() {
    if (this.modalForm.value.modalFormSubjectEx === this.modalForm.value.modalFormTextEx && this.modalForm.value.modalFormNameEx.length !== 0 && this.modalForm.value.modalFormSubjectEx.length >= 8 && this.modalForm.value.modalFormTextEx.length >= 8) {
      axios.post('/signup', {
        username: this.modalForm.value.modalFormNameEx,
        email: this.modalForm.value.modalFormEmailEx,
        password: this.modalForm.value.modalFormSubjectEx
      }).then(() => {
        window.location.href = "/home"
      }).catch(() => {
        alert("this user already exist")
      })

    } else {
      alert("the fuick is wrong with you")
    }

    this.modalForm.value.modalFormSubjectEx = '';
    this.modalForm.value.modalFormTextEx = '';
  }

  alo() {
    if (this.registerForm.value.orangeFormPass.length >= 8) {
      axios.post("/login", {
        username: this.registerForm.value.orangeFormName,
        password: this.registerForm.value.orangeFormPass
      }).then((res) => {
        window.location.href = "/home"
      }).catch((err) => {
        alert("username does not exist")
      })
    } else {
      alert("password should be bigger than 7 characters")
    }
  }
}





