import { RESTANGULAR_FEEDBACKS } from './../app.module';
import { baseURL } from './../shared/baseurl';
import { Feedback } from './../shared/feedback';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})



export class FeedbackService {

  constructor(@Inject(RESTANGULAR_FEEDBACKS) private RestangularFeedbacks, ) { }

  putFeedback(feedback: Feedback): Observable<Feedback> {
    return this.RestangularFeedbacks.all('feedback').post(feedback);
  }
}
