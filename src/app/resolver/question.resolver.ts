import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { FirebaseService } from '../services/firebase.service';

@Injectable()
export class QuestionResolver implements Resolve<any> {

  constructor(public firebaseService: FirebaseService) { }

  resolve(route: ActivatedRouteSnapshot,) {

    return new Promise((resolve, reject) => {
      let quizName = route.paramMap.get('name');
      let questionId = route.paramMap.get('id');
      this.firebaseService.get_question(quizName, questionId)
      .subscribe(
        data => {
          resolve(data);
        }
      );
    })
  }
}
