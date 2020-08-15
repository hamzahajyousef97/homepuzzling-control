import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../shared/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  userForm: FormGroup;
  user: User;
  errMess: string;

  @ViewChild('fform') feedbackFormDirective;

  formErrors = {
    'firstname': '',
    'lastname': '',
    'username': '',
    'email': '',
    'telnum': '',
    'password': '',
    'repassword': ''
  };

  validationMessages = {
    'firstname': {
      'required': 'First name is required.',
    },
    'lastname': {
      'required': 'Last name is required.',
    },
    'username': {
      'required': 'Username required.',
    },
    'email': {
      'required': 'Email is required.',
    },
    'telnum': {
      'required': 'Tel. number is required.',
      'pattern': 'Tel. number must contain only numbers.'
    },
    'password': {
      'required': 'Password is required.',
    },
    'repassword': {
      'required': 'Repassword is required.',
    }
  };

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private titleService: Title) {
    this.titleService.setTitle("إضافة مستخدم");
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.userForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      username: ['', [Validators.required]],
      telnum: ['90', [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      repassword: ['', [Validators.required]],
      admin: false
    });
    this.userForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    

    this.onValueChanged(); //(re)set form validation messages 
  }

  onValueChanged(data?: any) {
    if (!this.userForm) {
      return;
    }
    const form = this.userForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous erroe message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
  onSubmit() {
    this.user = this.userForm.value;
    this.userService.postuser(this.user)
    .subscribe(user => {
      this.user = user;
    },
      errmess => { 
        this.user = null; 
        this.errMess = <any>errmess; 
      }
    );
    this.userForm.reset({
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      telnum: '90',
      admin: false
    });
    this.feedbackFormDirective.resetForm();
  }

}
