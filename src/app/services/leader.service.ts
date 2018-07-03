import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { Observable, interval, pipe } from 'rxjs';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from '../services/process-httpmsg.service';


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
export class LeaderService {

  constructor(private http: Http, private processHttpMsgService: ProcessHttpmsgService) { }


  getLeaders(): Observable<Leader[]> {
    return this.http.get(baseURL + 'leaders').pipe(map(res => {
      return this.processHttpMsgService.extractData(res);
    }));
  }

  getLeader(id: number): Observable<Leader> {
    return this.http.get(baseURL + 'leaders/' + id).pipe(map(res => {
      return this.processHttpMsgService.extractData(res);
    }));
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get(baseURL + 'leaders?featured=true').pipe(map(res => {
      return this.processHttpMsgService.extractData(res)[0];
    }));
  }

}
