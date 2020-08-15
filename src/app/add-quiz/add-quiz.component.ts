import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { baseURL } from '../shared/baseurl';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { Quiz } from '../shared/quiz';
import { Title } from '@angular/platform-browser';
import { QuizService } from '../services/quiz.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';


@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.scss']
})
export class AddQuizComponent implements OnInit {
  errMess: string;

  quizForm: FormGroup;
  quiz: Quiz;

  files: File[] = [];
  file: File;

  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;

  @ViewChild('fform') quizFormDirective;

  formErrors = {
    'link': '',
    'name': '',
    'description': '',
    'quizType': '',
    'time': ''
  };
  validationMessages = {
    'link': {
      'required': 'link is required.',
    },
    'name': {
      'required': 'name is required.',
    },
    'description': {
      'required': 'description is required.',
    },
    'time': {
      'required': 'time is required.',
    },
    'quizType': {
      'required': 'time is required.',
    },
  };

  constructor(
    @Inject('BaseURL') private BaseURL,
    private fb: FormBuilder,
    public router: Router,
    public snackBar: MatSnackBar,
    private quizService: QuizService,
    private storage: AngularFireStorage,
    private titleService: Title) {
      this.titleService.setTitle("إضافة امتحان");
    }

  ngOnInit() {
    this.createForm();
  }
  
  createForm() {
    this.quizForm = this.fb.group({
      link: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      quizType: ['', [Validators.required]],
      time: ['', [Validators.required]],
      autoMove: false,
    });

    this.quizForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); //(re)set form validation messages 
  }
  onValueChanged(data?: any) {
    if (!this.quizForm) {
      return;
    }
    const form = this.quizForm;
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

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
      this.file = this.files[i];
      this.startUpload(this.file);
    }
  }

  startUpload(file) {
    const path = `test/${Date.now()}_${file.name}`;
    const ref = this.storage.ref(path);
    this.task = this.storage.upload(path, file);
    this.percentage = this.task.percentageChanges();
    this.snapshot   = this.task.snapshotChanges().pipe(
      tap(console.log),
      finalize( async() =>  {
        this.downloadURL = await ref.getDownloadURL().toPromise();
        this.files = [];
      }),
    );
  }

  onSubmit() {
    const formData = {
      ...this.quizForm.value,
      image: this.downloadURL,
    };

    this.quiz = formData;

    this.quizService.addQuiz(this.quiz)
    .subscribe(quiz => {
      this.quiz = quiz;
      this.openSnackBar("تم اضافة الامتحان بنجاح", '🙂')
      setTimeout(() => { this.router.navigate(['/add-questions/' + this.quiz.link]); }, 2000);
    },
      errmess => {
        this.quiz = null;
        this.errMess = <any>errmess;
      }
    );

    this.quizForm.reset({
      name: '',
      description: '',
      link: '',
      quizType: '',
      time: '',
    });
    this.quizFormDirective.resetForm();
  }

  openSnackBar(message, action) {
    this.snackBar.open(message, action, {
        duration: 4000,
        horizontalPosition: 'left'
    });
  }
}
