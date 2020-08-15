import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Params, ActivatedRoute, Router ,NavigationEnd } from '@angular/router';
import { QuizService } from '../services/quiz.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { youKnow } from '../shared/youKnow';

@Component({
  selector: 'app-edit-you-know',
  templateUrl: './edit-you-know.component.html',
  styleUrls: ['./edit-you-know.component.scss']
})
export class EditYouKnowComponent implements OnInit {

  errMess: string;
  youKnowForm: FormGroup;
  searchText;
  youKnow: youKnow;
  id: string;

  aTag: string = '<a href="https://example.com"> المصدر او الرابط </a>';
  brTag: string = '<br>';

  @ViewChild('fform') youKnowFormDirective;

  formErrors = {
    'name': '',
    'description': ''
  };
  validationMessages = {
    'name': {
      'required': 'name is required.',
    },
    'description': {
      'required': 'description is required.',
    }
  };

  constructor(
    private fb: FormBuilder,
    public router: Router,
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private quizService: QuizService,
    private titleService: Title) { 
      this.titleService.setTitle("تعديل هل تعلم");
  }

  ngOnInit() {
    this.createForm();

    this.route.params
    .pipe(switchMap((params: Params) => {
      this.id = params['id'];
      return this.quizService.get_oneYouKnow(params['id']);
    }))
    .subscribe(youKnow => { 
      this.youKnow = youKnow;
    },
    errmess => this.errMess = <any>errmess);
  }
  
  createForm() {
    this.youKnowForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });

    this.youKnowForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); //(re)set form validation messages 
  }

  onValueChanged(data?: any) {
    if (!this.youKnowForm) {
      return;
    }
    const form = this.youKnowForm;
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
    const formData = {
      ...this.youKnowForm.value,
    };
    this.youKnow = formData;
    this.quizService.editYouKnow(this.id, this.youKnow)
    .subscribe((youKnow: any) => {
      this.youKnow = youKnow;
      console.log(this.youKnow)
      this.openSnackBar("تم تعديل هل تعلم بنجاح", '🙂');
      setTimeout(() => { this.router.navigate(['/youKnow']); }, 2000);
    },
      errmess => {
        this.youKnow = null; 
        this.errMess = <any>errmess;
      }
    );

    this.youKnowForm.reset({
      name: '',
      description: ''
    });
    this.youKnowFormDirective.resetForm();
  }

  openSnackBar(message, action) {
    this.snackBar.open(message, action, {
        duration: 4000,
        horizontalPosition: 'left'
    });
  }
}
