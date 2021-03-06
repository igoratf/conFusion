import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { Http, Response } from '@angular/http';
import { interval, pipe } from 'rxjs';
import {Observable} from 'rxjs/Rx';

import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';
// Statics
import 'rxjs/add/observable/throw';

// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import {switchMap, map} from 'rxjs/operators';


@Injectable()
export class DishService {

  constructor(private http: Http, private processHTTPMsgService: ProcessHttpmsgService) { }

  getDishes(): Observable<Dish[]> {
    return this.http.get(baseURL + 'dishes')
    .map(res => {
      return this.processHTTPMsgService.extractData(res);
    })
    .catch(error => {
      return this.processHTTPMsgService.handleError(error);
    });
  }

  getDish(id: number): Observable<Dish> {
    return this.http.get(baseURL + 'dishes/' + id)
    .map(res => {
      return this.processHTTPMsgService.extractData(res);
    })
    .catch(error => {
      return this.processHTTPMsgService.handleError(error);
    });
}

  getFeaturedDish(): Observable<Dish> {
    return this.http.get(baseURL + 'dishes?featured=true')
    .pipe(map(res => {
      return this.processHTTPMsgService.extractData(res)[0];
    }))
    .catch(error => {
      return this.processHTTPMsgService.handleError(error);
    })
}

  getDishIds(): Observable<number[]> {
    return this.getDishes().pipe(map(dishes => {
      return dishes.map(dish => dish.id);
    }));
  }

}
