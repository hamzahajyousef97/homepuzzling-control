import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { FirebaseService } from '../services/firebase.service';

@Injectable()
export class QuizResolver implements Resolve<any> {

  constructor(public firebaseService: FirebaseService) { }

  resolve(route: ActivatedRouteSnapshot,) {

    return new Promise((resolve, reject) => {
      let quizId = route.paramMap.get('id');
      this.firebaseService.get_quiz(quizId)
      .subscribe(
        data => {
          resolve(data);
        }
      );
    })
  }
}
