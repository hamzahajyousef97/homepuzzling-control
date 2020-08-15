import { Component, OnInit , Inject, ViewChild} from '@angular/core';
import { UserService } from '../services/user.service'
import { User } from '../shared/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Params, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  errMess: string;
  users: User[];
  user: User;
  put: false;
  userForm: FormGroup;


  formErrors = {
    'firstname': '',
    'lastname': '',
    'username': '',
    'tel': '',
    'email': '',
    'admin': '',
  };

  validationMessages = {
    'firstname': {
      'required': 'firstname is required.',
    },
    'lastname': {
      'required': 'lastname is required.',
    },
    'username': {
      'required': 'Username required.',
    },
    'tel': {
      'required': 'Tel is required.',
    },
    'email': {
      'required': 'Email is required.',
    }
  };


  constructor( @Inject('BaseURL') private BaseURL, private userService: UserService,
  private route: ActivatedRoute,
  private fb: FormBuilder,
  private titleService: Title) {
    this.titleService.setTitle("المستخدمون");
  }

  ngOnInit() {
    this.userService.getUsers()
    .subscribe((users) => 
      this.users = users,
      errmess => this.errMess = <any>errmess);
      
      this.createForm();
  }


  createForm() {
    this.userForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      username: ['', [Validators.required]],
      tel: ['90', [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      admin: [ Boolean, Validators.required ]
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
    for (const field in this.userForm) {
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
    this.userService.putUser(this.user)
    .subscribe(user => {
      this.user = user;
    },
      errmess => { 
        this.user = null; 
        this.errMess = <any>errmess; 
      }
    );
    this.put = false;
  }

  deleteUser(id, index) {
    this.userService.deleteUserIds(id)
      .subscribe(() => this.users.splice(index,1),
        errmess => this.errMess = <any>errmess);
  }
}
