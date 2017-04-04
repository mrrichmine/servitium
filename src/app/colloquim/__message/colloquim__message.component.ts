import { Component, Input }        from '@angular/core';
import { ColloquimMessage } from "../colloquim.model";

@Component({
  selector:     'app-colloquim__message',
  templateUrl:  './colloquim__message.component.html',
  styleUrls:    ['./colloquim__message.component.css']
})
export class Colloquim__MessageComponent {

  @Input() message: ColloquimMessage;

}
