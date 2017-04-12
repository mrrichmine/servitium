import { Injectable }               from "@angular/core";
import { Http, Headers, Response }  from "@angular/http";
import 'rxjs/Rx';
import { Observable }               from "rxjs";

import { ColloquimMessage }         from "./colloquim.model";

import config                       from '../../../config/config.json';

@Injectable()
export class ColloquimService {

  private messages: ColloquimMessage[] = [];

  constructor( private http: Http ) { }

  postMessage
    ( colloquimMessage: ColloquimMessage ) {

    const body = JSON.stringify( colloquimMessage );
    const headers = new Headers({'Content-Type': 'application/json'});

    return this.http.post('http://' + config.serverHost + '/colloquim/post', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  getMessage
    ( colloquimMessage: ColloquimMessage ) {

    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.get('http://' + config.serverHost + '/colloquim/get/' + colloquimMessage.room, {headers: headers})
      .map((response: Response) => {
        const colloquimmessages = response.json().obj;
        let transformedMessages: ColloquimMessage[] = [];
        for (let colloquimmessage of colloquimmessages) {
          transformedMessages.push(new ColloquimMessage(
            colloquimmessage.text,
            colloquimmessage.creator,
            colloquimmessage.date,
            colloquimmessage.room)
          );
        }
        this.messages = transformedMessages;
        return transformedMessages;
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }
}
