import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { baseURL } from '../shared/baseurl';
import { Params, ActivatedRoute, Router ,NavigationEnd } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { Quiz } from '../shared/quiz';
import { Title } from '@angular/platform-browser';
import { QuizService } from '../services/quiz.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';


@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})
export class EditQuizComponent implements OnInit {


  errMess: string;
  NotTouched: boolean = true;
  quizForm: FormGroup;
  quiz: Quiz;
  link: any;

  files: File[] = [];
  file: File;

  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;

  @ViewChild('fform') productFormDirective;

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
      'required': 'nameAR is required.',
    },
    'description': {
      'required': 'descriptionAR is required.',
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
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private quizService: QuizService,
    private storage: AngularFireStorage,
    private titleService: Title) {
      this.titleService.setTitle("تعديل الامتحان");
    }

    ngOnInit() {
      this.createForm();

      this.route.params
        .pipe(switchMap((params: Params) => {return this.quizService.getQuiz(params['name']); }))
        .subscribe(quiz => { 
          this.quiz = quiz;
          this.link = quiz.link;
        },
        errmess => this.errMess = <any>errmess);
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
          this.NotTouched = false;
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
      this.quizService.editQuiz(this.link, this.quiz)
      .subscribe((quiz: any) => {
        this.quiz = quiz;
        this.openSnackBar("تم تعديل الامتحان بنجاح", '🙂');
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
      this.productFormDirective.resetForm();
    }
  
    openSnackBar(message, action) {
      this.snackBar.open(message, action, {
          duration: 4000,
          horizontalPosition: 'left'
      });
    }
}
