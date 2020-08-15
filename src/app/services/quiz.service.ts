import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { catchError, map } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Quiz } from '../shared/quiz';
import { youKnow } from '../shared/youKnow';
import { Information } from '../shared/information';
import { Question } from '../shared/question';
import { Option } from '../shared/option';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { }

  getQuizes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(baseURL + 'quizes')
      .pipe(catchError(this.processHTTPMsgService.handlError));
  }

  getQuiz(link: string): Observable<Quiz> {
    return this.http.get<Quiz>(baseURL + 'quizes/' + link)
      .pipe(catchError(this.processHTTPMsgService.handlError));
  }

  addQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>(baseURL + 'quizes' , quiz)
    .pipe(catchError(this.processHTTPMsgService.handlError));
  }

  // getCleanNames(): Observable<string[] | any> {
  //   return this.getQuizes()
  //     .pipe(map(clean => clean.map(clean => clean.name)))
  //     .pipe(catchError(error => error));
  // }

  editQuiz(link: string , quiz: Quiz): Observable<Quiz> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }) 
    };
    return this.http.put<Quiz>(baseURL + 'quizes/' + link , quiz , httpOptions)
    .pipe(catchError(this.processHTTPMsgService.handlError));
  }

  deleteQuiz(link: string) {
    return this.http.delete<Quiz>(baseURL + 'quizes/' + link)
      .pipe(catchError(this.processHTTPMsgService.handlError));
  }

  getQuestions(link: string): Observable<Question[]> {
    return this.http.get<Question[]>(baseURL + 'quizes/' + link + '/questions')
      .pipe(catchError(this.processHTTPMsgService.handlError));
  }

  getQuestion(link: string, _id: string): Observable<Question> {
    return this.http.get<Question>(baseURL + 'quizes/' + link + '/questions/' + _id)
      .pipe(catchError(this.processHTTPMsgService.handlError));
  }

  addQuestion(link: string, question: Question) {
    return this.http.post(baseURL + 'quizes/' + link + '/questions', question)
      .pipe(catchError(this.processHTTPMsgService.handlError));
  }

  editQuestion(link: string, questionId: string, question: Question) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }) 
    };
    return this.http.put<Quiz>(baseURL + 'quizes/' + link + '/questions/' + questionId, question, httpOptions)
    .pipe(catchError(this.processHTTPMsgService.handlError));
  }

  deleteQuestion(link: string, questionId: string) {
    return this.http.delete<Question>(baseURL + 'quizes/' + link + '/questions/' + questionId)
    .pipe(catchError(this.processHTTPMsgService.handlError));
  }


  getOptions(link: string, questionId: string): Observable<Option[]> {
    return this.http.get<Option[]>(baseURL + 'quizes/' + link + '/questions/' + questionId + '/options')
      .pipe(catchError(this.processHTTPMsgService.handlError));
  }

  getOption(link: string, questionId: string, optionId: string): Observable<Option> {
    return this.http.get<Option>(baseURL + 'quizes/' + link + '/questions/' + questionId + '/options/' + optionId)
      .pipe(catchError(this.processHTTPMsgService.handlError));
  }

  addOptions(link: string, questionId: string, option: Option) {
    return this.http.post(baseURL + 'quizes/' + link + '/questions/' + questionId + '/options', option)
      .pipe(catchError(this.processHTTPMsgService.handlError));
  }

  deleteoption(link: string, questionId: string, optionId: string) {
    return this.http.delete<Option>(baseURL + 'quizes/' + link + '/questions/' + questionId + '/options/' + optionId)
    .pipe(catchError(this.processHTTPMsgService.handlError));
  }

  addYouKnow(youKnow: youKnow): Observable<youKnow> {
    return this.http.post<youKnow>(baseURL + 'youKnow' , youKnow)
    .pipe(catchError(this.processHTTPMsgService.handlError));
  }

  editYouKnow(id: string , youKnow: youKnow): Observable<youKnow> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }) 
    };
    return this.http.put<youKnow>(baseURL + 'youKnow/' + id , youKnow , httpOptions)
    .pipe(catchError(this.processHTTPMsgService.handlError));
  }

  getYouKnow(): Observable<youKnow[]> {
    return this.http.get<youKnow[]>(baseURL + 'youKnow')
      .pipe(catchError(this.processHTTPMsgService.handlError));
  }

  get_oneYouKnow(id: string): Observable<youKnow> {
    return this.http.get<youKnow>(baseURL + 'youKnow/' + id)
      .pipe(catchError(this.processHTTPMsgService.handlError));
  }

  deleteYouKnow(id: string) {
    return this.http.delete<youKnow>(baseURL + 'youKnow/' + id)
      .pipe(catchError(this.processHTTPMsgService.handlError));
  }


  addInformation(information: Information): Observable<Information> {
    return this.http.post<Information>(baseURL + 'informations' , information)
    .pipe(catchError(this.processHTTPMsgService.handlError));
  }

  editInformation(id: string , information: Information): Observable<Information> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }) 
    };
    return this.http.put<Information>(baseURL + 'informations/' + id , information , httpOptions)
    .pipe(catchError(this.processHTTPMsgService.handlError));
  }

  getInformations(): Observable<Information[]> {
    return this.http.get<Information[]>(baseURL + 'informations')
      .pipe(catchError(this.processHTTPMsgService.handlError));
  }

  getInformation(id: string): Observable<Information> {
    return this.http.get<Information>(baseURL + 'informations/' + id)
      .pipe(catchError(this.processHTTPMsgService.handlError));
  }

  deleteInformation(id: string) {
    return this.http.delete<Information>(baseURL + 'informations/' + id)
      .pipe(catchError(this.processHTTPMsgService.handlError));
  }
}
