import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Params, ActivatedRoute, Router ,NavigationEnd } from '@angular/router';
import { QuizService } from '../services/quiz.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { Information } from '../shared/information';

@Component({
  selector: 'app-edit-information',
  templateUrl: './edit-information.component.html',
  styleUrls: ['./edit-information.component.scss']
})
export class EditInformationComponent implements OnInit {

  errMess: string;
  informationForm: FormGroup;
  searchText;
  information: Information;
  id: string;

  aTag: string = '<a href="https://example.com"> المصدر او الرابط </a>';
  brTag: string = '<br>';

  formName: string;
  formDescription: string;

  @ViewChild('fform') informationFormDirective;

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
      this.titleService.setTitle("تعديل معلومات متنوعة");
  }

  ngOnInit() {
    this.createForm();

    this.route.params
    .pipe(switchMap((params: Params) => {
      this.id = params['id'];
      return this.quizService.getInformation(params['id']);
    }))
    .subscribe(information => { 
      this.information = information;
    },
    errmess => this.errMess = <any>errmess);
  }

  createForm() {
    this.informationForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });

    this.informationForm.valueChanges
      .subscribe((data) => {
        this.onValueChanged(data)
        this.formName = data.name
        this.formDescription = data.description
      });

    this.onValueChanged(); //(re)set form validation messages 
  }

  onValueChanged(data?: any) {
    if (!this.informationForm) {
      return;
    }
    const form = this.informationForm;
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
      ...this.informationForm.value,
    };
    this.information = formData;
    this.quizService.editInformation(this.id, this.information)
    .subscribe((information: any) => {
      this.information = information;
      console.log(this.information)
      this.openSnackBar("تم تعديل هل تعلم بنجاح", '🙂');
      setTimeout(() => { this.router.navigate(['/informations']); }, 2000);
    },
      errmess => {
        this.information = null; 
        this.errMess = <any>errmess;
      }
    );

    this.informationForm.reset({
      name: '',
      description: ''
    });
    this.informationFormDirective.resetForm();
  }

  openSnackBar(message, action) {
    this.snackBar.open(message, action, {
        duration: 4000,
        horizontalPosition: 'left'
    });
  }
}
