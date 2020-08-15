import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { Title } from '@angular/platform-browser';
import { Information } from '../shared/information';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  information: Information[];
  errMess: string;
  website: string = 'https://homepuzzling.com/';
  searchText;

  constructor(
    public quizService: QuizService,
    private titleService: Title) {
      this.titleService.setTitle("صفحة هل تعلم");
    }

  ngOnInit() {
    this.quizService.getInformations()
    .subscribe((youKnow) => {
      this.information = youKnow
    },
    errmess => {
      this.information = null;
      this.errMess = <any>errmess
    });
  }

  deleteInformation(id, index) {
    this.quizService.deleteInformation(id)
    .subscribe(() => this.information.splice(index,1),
    errmess => this.errMess = <any>errmess);
  }
}
