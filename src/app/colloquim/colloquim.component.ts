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

  timer: any;

  isSubmitedName    = false;

  colloquimForm:  FormGroup;

  messages: ColloquimMessage[];

  constructor( private colloquimService: ColloquimService ) {}

  ngOnInit() {

    this.colloquimForm  = new FormGroup({
      text:               new FormControl( null, [ ] ),
      creator:            new FormControl( {disabled: true}, [ ] ),
      room:               new FormControl( null, [ ] )
    });

  }

  onSubmitingName(){

    this.isSubmitedName = true;
    this.text = 'присоединился к обсуждению';

    const colloquimMessage = new ColloquimMessage(
      this.text,
      this.colloquimForm.value.creator,
      this.date,
      this.colloquimForm.value.room
    );

    this.colloquimService.postMessage( colloquimMessage )
      .subscribe(
        data => {

          this.formReset();
          this.startGetTimer()

        },
        error => {}
      );

    this.text = '';

  }

  onSubmitingMessage(){

    const colloquimMessage = new ColloquimMessage(
      this.colloquimForm.value.text,
      this.colloquimForm.value.creator,
      this.date,
      this.colloquimForm.value.room
    );

    this.colloquimService.postMessage( colloquimMessage )
      .subscribe(
        data => {

          this.formReset();
        },
        error => {}
      );

  }

  formReset(){

    this.colloquimForm.value.text = ''

  }

  getMessages() {

    const colloquimMessage = new ColloquimMessage(
      this.colloquimForm.value.text,
      this.colloquimForm.value.creator,
      this.date,
      this.colloquimForm.value.room
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


