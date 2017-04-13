import { Component, OnInit }        from '@angular/core';
import { FormGroup, FormControl }   from '@angular/forms';

import { ColloquimMessage }         from "./colloquim.model";
import { ColloquimService }         from "./colloquim.service";

@Component({
  selector:     'app-colloquim',
  templateUrl:  './colloquim.component.html',
  styleUrls:    ['./colloquim.component.css']
})
export class ColloquimComponent implements OnInit {

  creator         = '';
  text            = '';
  date            = '';
  room            = '';
  submittedRoom   = '';

  timer: any;

  isSubmitedName    = false;

  colloquimForm:  FormGroup;

  messages: ColloquimMessage[];

  constructor( private colloquimService: ColloquimService ) {}

  ngOnInit() {

    this.colloquimForm  = new FormGroup({
      text:               new FormControl( null, [ ] ),
      creator:            new FormControl( null, [ ] ),
      room:               new FormControl( null, [ ] )
    });

  }

  onSubmitingName(){

    this.isSubmitedName = true;
    this.colloquimForm.controls['creator'].reset({value: this.colloquimForm.get('creator').value, disabled: true});

    this.startGetTimer()

  }

  onSubmitingMessage(){

    const colloquimMessage = new ColloquimMessage(
      this.colloquimForm.get('text').value,
      this.colloquimForm.get('creator').value,
      this.date,
      this.colloquimForm.get('room').value
    );

    this.colloquimService.postMessage( colloquimMessage )
      .subscribe(
        data => {
          this.clearMessage()
        },
        error => {}
      );

  }

  clearMessage(){

    this.colloquimForm.get('text').reset();

  }

  getMessages() {

    const colloquimMessage = new ColloquimMessage(
      this.colloquimForm.get('text').value,
      this.colloquimForm.get('creator').value,
      this.date,
      this.colloquimForm.get('room').value
    );

    this.colloquimService.getMessage( colloquimMessage )
      .subscribe(
        (messages: ColloquimMessage[]) => {
          this.messages = messages;
          return this.messages
        }
      )
  }

  startGetTimer() {
    this.timer = setInterval(this.getMessages.bind(this), 3000);
  }

  stopGetTimer() {
    clearInterval(this.timer);
  }


}


