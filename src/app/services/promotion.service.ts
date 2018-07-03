import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { Observable, interval, pipe } from 'rxjs';

import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';


import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';

import {switchMap, map} from 'rxjs/operators';


@Injectable()
export class PromotionService {

  constructor(private http: Http, private processHttpMsg: ProcessHttpmsgService) { }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get(baseURL + 'promotions').pipe(map(res => {
      return this.processHttpMsg.extractData(res);
    }));
  }

  getPromotion(id: number): Observable<Promotion> {
    return this.http.get(baseURL + 'promotions/' + id).pipe(map(res => {
      return this.processHttpMsg.extractData(res);
    }));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get(baseURL + 'promotions?featured=true').pipe(map(res => {
      return this.processHttpMsg.extractData(res)[0];
    }));
  }

}
