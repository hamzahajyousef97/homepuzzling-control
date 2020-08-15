import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { Title } from '@angular/platform-browser';
import { youKnow } from '../shared/youKnow';

@Component({
  selector: 'app-you-know',
  templateUrl: './you-know.component.html',
  styleUrls: ['./you-know.component.scss']
})
export class YouKnowComponent implements OnInit {

  youKnow: youKnow[];
  errMess: string;
  website: string = 'https://homepuzzling.com/';
  searchText;

  constructor(
    public quizService: QuizService,
    private titleService: Title) {
      this.titleService.setTitle("صفحة هل تعلم");
    }

  ngOnInit() {
    this.quizService.getYouKnow()
    .subscribe((youKnow) => {
      this.youKnow = youKnow
    },
    errmess => {
      this.youKnow = null;
      this.errMess = <any>errmess
    });
  }

  delete_youKnow(id, index) {
    this.quizService.deleteYouKnow(id)
    .subscribe(() => this.youKnow.splice(index,1),
    errmess => this.errMess = <any>errmess);
  }

}
