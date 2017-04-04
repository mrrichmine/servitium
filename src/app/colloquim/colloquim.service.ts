import { Injectable }               from "@angular/core";
import { Http, Headers, Response }  from "@angular/http";
import 'rxjs/Rx';
import { Observable }               from "rxjs";

import { ColloquimMessage }         from "./colloquim.model";

@Injectable()
export class ColloquimService {

  private messages: ColloquimMessage[] = [];

  constructor( private http: Http ) { }

  postMessage
    ( colloquimMessage: ColloquimMessage ) {

    const body = JSON.stringify( colloquimMessage );
    const headers = new Headers({'Content-Type': 'application/json'});

    return this.http.post('http://10.10.3.158/colloquim/post', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  getMessages() {

    const headers = new Headers({'Content-Type': 'application/json'});

    return this.http.get('http://10.10.3.158/colloquim/get', {headers: headers})
      .map((response: Response) => {
        const colloquimmessages = response.json().obj;
        let transformedMessages: ColloquimMessage[] = [];
        for (let colloquimmessage of colloquimmessages) {
          transformedMessages.push(new ColloquimMessage(
            colloquimmessage.text,
            colloquimmessage.creator,
            colloquimmessage.date)
          );
        }
        this.messages = transformedMessages;
        return transformedMessages;
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }
}
