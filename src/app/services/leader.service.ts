import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from '../services/process-httpmsg.service';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';

@Injectable()
export class LeaderService {

  constructor(private http: Http, private processHttpMsgService: ProcessHttpmsgService) { }


  getLeaders(): Observable<Leader[]> {
    return this.http.get(baseURL + 'leaders').map(res => {
      return this.processHttpMsgService.extractData(res);
    });
  }

  getLeader(id: number): Observable<Leader> {
    return this.http.get(baseURL + 'leaders/' + id).map(res => {
      return this.processHttpMsgService.extractData(res);
    });
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get(baseURL + 'leaders?featured=true').map(res => {
      return this.processHttpMsgService.extractData(res)[0];
    });
  }

}
