import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {username: '', password: '', remember: false};
  errMess: string;

  loading = false;

  constructor(private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.loading = true;
    this.authService.logIn(this.user)
      .subscribe(res => {
        if (res.success) {
          this.router.navigate(['./home']);
          this.loading = false;
        }
        else {
          this.loading = false;
        }
      },
      error => {
        this.errMess = error
        this.loading = false;
      })
  }

}