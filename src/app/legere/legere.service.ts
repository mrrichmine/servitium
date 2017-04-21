import { Injectable }               from "@angular/core";
import { Http, Headers, Response }  from "@angular/http";
import 'rxjs/Rx';
import { Observable }               from "rxjs";

import { LegereValue, LegereIndicator, LegereIndicatorGroup } from "./legere.model";

import config                       from '../../../config/config.json';

@Injectable()
export class LegereService {

  constructor( private http: Http ) { }

  postValue
  ( legereValue: LegereValue ) {

    const body = JSON.stringify( legereValue );
    const headers = new Headers({'Content-Type': 'application/json'});

    return this.http.post('http://' + config.serverHost + '/value/post', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  postIndicator
  ( legereIndicator: LegereIndicator ) {

    const body = JSON.stringify( legereIndicator );
    const headers = new Headers({'Content-Type': 'application/json'});

    return this.http.post('http://' + config.serverHost + '/indicator/post', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  postIndicatorGroup
  ( legereIndicatorGroup: LegereIndicatorGroup ) {

    const body = JSON.stringify( legereIndicatorGroup );
    const headers = new Headers({'Content-Type': 'application/json'});

    return this.http.post('http://' + config.serverHost + '/indicator-group/post', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

}
