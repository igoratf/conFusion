import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';

@Injectable()
export class PromotionService {

  constructor(private http: Http, private processHttpMsg: ProcessHttpmsgService) { }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get(baseURL + 'promotions').map(res => {
      return this.processHttpMsg.extractData(res);
    });
  }

  getPromotion(id: number): Observable<Promotion> {
    return this.http.get(baseURL + 'promotions/' + id).map(res => {
      return this.processHttpMsg.extractData(res);
    })
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get(baseURL + 'promotions?featured=true').map(res => {
      return this.processHttpMsg.extractData(res)[0];
    })
  }

}
