import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { Title } from '@angular/platform-browser';
import { Quiz } from '../shared/quiz';

@Component({
  selector: 'app-quizes',
  templateUrl: './quizes.component.html',
  styleUrls: ['./quizes.component.scss']
})
export class QuizesComponent implements OnInit {

  quizes: Quiz[];
  errMess: string;
  website: string = 'https://homepuzzling.com/';
  sumQuizViews: number = 0;
  searchText;

  constructor(
    public quizService: QuizService,
    private titleService: Title) {
      this.titleService.setTitle("كل الامتحانات");
    }

  ngOnInit() {
    this.quizService.getQuizes()
    .subscribe((quizes) => {
      this.quizes = quizes
      for(let i = 0; i < this.quizes.length; i++ ) {
        this.sumQuizViews += this.quizes[i].quizViews;
      }
    },
      errmess => {
        this.quizes = null;
        this.errMess = <any>errmess
      });
  }

  delete_quiz(link, index) {
    this.quizService.deleteQuiz(link)
    .subscribe(() => this.quizes.splice(index,1),
    errmess => this.errMess = <any>errmess);
  }
}
