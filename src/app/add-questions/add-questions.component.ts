import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Params, ActivatedRoute, Router ,NavigationEnd } from '@angular/router';
import { QuizService } from '../services/quiz.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { Question } from '../shared/question';
import { Quiz } from '../shared/quiz';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.scss']
})
export class AddQuestionsComponent implements OnInit {
  quiz: Quiz;
  errMess: string;
  questions: Question[];
  question: Question;
  questionForm: FormGroup;
  searchText;

  @ViewChild('fform') questionFormDirective;

  formErrors = {
    'question': '',
    'optionNum': ''
  };
  validationMessages = {
    'question': {
      'required': 'question is required.',
    },
    'optionNum': {
      'required': 'question is required.',
    }
  };

  constructor(
    private fb: FormBuilder,
    public router: Router,
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private quizService: QuizService,
    private titleService: Title) { 
      this.titleService.setTitle("إضافة سؤال");
    }

  ngOnInit() {
    this.route.params
      .pipe(switchMap((params: Params) => {return this.quizService.getQuiz(params['name']); }))
      .subscribe(quiz => {
        this.quiz = quiz;
        this.questions = quiz.questions;
      },
      errmess => this.errMess = <any>errmess);

    this.createForm();

  }
  createForm() {
    this.questionForm = this.fb.group({
      question: ['', [Validators.required]],
      optionNum: ['4', [Validators.required]],
    });

    this.questionForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); //(re)set form validation messages 
  }

  onValueChanged(data?: any) {
    if (!this.questionForm) {
      return;
    }
    const form = this.questionForm;
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
      ...this.questionForm.value,
    };
    this.question = formData;
    this.quizService.addQuestion(this.quiz.link, this.question)
    .subscribe((quiz: any) => {
      this.quiz = quiz;
      this.questions = quiz.questions
      this.openSnackBar("تم اضافة السؤال بنجاح", '🙂');
      this.ngOnInit();
    },
      errmess => {
        this.quiz = null; 
        this.errMess = <any>errmess;
      }
    );

    this.questionForm.reset({
      question: '',
      optionNum: '4'
    });
    this.questionFormDirective.resetForm();
  }

  delete_Question(questionId, index) {
    this.quizService.deleteQuestion(this.quiz.link, questionId)
    .subscribe(() => {
      this.questions.splice(index,1);
      this.openSnackBar('Question Deleted Successfully...', '🙂')
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
