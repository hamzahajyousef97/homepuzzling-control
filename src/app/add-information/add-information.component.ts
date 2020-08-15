import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../services/quiz.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { Information } from '../shared/information';

@Component({
  selector: 'app-add-information',
  templateUrl: './add-information.component.html',
  styleUrls: ['./add-information.component.scss']
})
export class AddInformationComponent implements OnInit {

  errMess: string;
  informationForm: FormGroup;
  searchText;
  information: Information;

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
      this.titleService.setTitle("إضافة معلومات متنوعة");
    }

  ngOnInit() {
    this.createForm();
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
    this.quizService.addInformation(this.information)
    .subscribe((information: any) => {
      this.information = information;
      console.log(this.information)
      this.openSnackBar("تم اضافة هل تعلم بنجاح", '🙂');
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
