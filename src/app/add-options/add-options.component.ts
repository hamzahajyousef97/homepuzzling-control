import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Params, ActivatedRoute, Router ,NavigationEnd } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { QuizService } from '../services/quiz.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { Question } from '../shared/question';
import { Option } from '../shared/option';
import { Quiz } from '../shared/quiz';
import { baseURL } from '../shared/baseurl';


@Component({
  selector: 'app-add-options',
  templateUrl: './add-options.component.html',
  styleUrls: ['./add-options.component.scss']
})
export class AddOptionsComponent implements OnInit {

  optionForm: FormGroup;
  questionId: any;
  quizName: any;
  option: Option;
  options: Option[];
  optionNumber: number;
  quiz: Quiz;
  errMess: string;
  question: Question;

  @ViewChild('fform') optionFormDirective;

  formErrors = {
    'option': '',

  };
  validationMessages = {
    'option': {
      'required': 'option is required.',
    }
  };


  constructor(
    @Inject('BaseURL') private BaseURL,
    private fb: FormBuilder,
    public router: Router,
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private quizService: QuizService,
    private titleService: Title
    ) { 
      this.titleService.setTitle("إضافة خيار للسؤال");
      this.questionId = this.route.snapshot.params['id'];
      this.quizName = this.route.snapshot.params['name'];
    }

    ngOnInit() {

      this.route.params
      .pipe(switchMap((params: Params) => {
        return this.quizService.getQuestion(params['name'], params['id']); 
      }))
      .subscribe(question => { 
        this.question = question;
      },
      errmess => this.errMess = <any>errmess);

      this.route.params
      .pipe(switchMap((params: Params) => {
        return this.quizService.getOptions(params['name'], params['id']); 
      }))
      .subscribe(options => { 
        this.options = options;
        this.optionNumber = options.length;
      },
      errmess => this.errMess = <any>errmess);
      this.createForm();
    }
  
    createForm() {
      this.optionForm = this.fb.group({
        option: ['', [Validators.required]],
        isAnswer: false,
      });
  
      this.optionForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
  
      this.onValueChanged(); //(re)set form validation messages 
    }

    onValueChanged(data?: any) {
      if (!this.optionForm) {
        return;
      }
      const form = this.optionForm;
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
        ...this.optionForm.value,
      };

      this.option = formData;
  
      this.quizService.addOptions(this.quizName, this.questionId, this.option)
      .subscribe((options: any) => {
        this.options = options;
        this.openSnackBar("تم اضافة الخيار بنجاح", '🙂');
        this.ngOnInit();
      },
        errmess => {
          this.options = null; 
          this.errMess = <any>errmess;
        }
      );
  
      this.optionForm.reset({
        option: '',
      });
      this.optionFormDirective.resetForm();
    }

    delete_Option(OptionId, index) {
      this.quizService.deleteoption(this.quizName, this.questionId, OptionId)
      .subscribe(() => {
        this.options.splice(index,1);
        this.ngOnInit();
        this.openSnackBar('Option Deleted Successfully...', '🙂')
      },
        errmess => this.errMess = <any>errmess);
    }
  
    openSnackBar(message, action) {
      this.snackBar.open(message, action, {
          duration: 4000,
          horizontalPosition: 'left'
      });
    }



}
