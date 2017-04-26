import { Component, OnInit }        from '@angular/core';
import { FormGroup, FormControl }   from '@angular/forms';

import { LegereValue, LegereIndicator, LegereIndicatorGroup } from "./legere.model";
import { LegereService }                                      from "./legere.service";

@Component({
  selector: 'app-legere',
  templateUrl: './legere.component.html',
  styleUrls: ['./legere.component.css']
})
export class LegereComponent implements OnInit {

  value = '';
  groupId = '';
  date = '';

  legereindicatorgroups: LegereIndicatorGroup[];
  legereindicators: LegereIndicator[];
  legerevalues: LegereValue[];

  selectedIndicatorGroup: LegereIndicatorGroup;
  selectedIndicator: LegereIndicator;
  selectedProvincia = '';

  isSubmitedProvincia       = false;
  isSubmitedIndicatorGroup  = false;

  isEditIndicatorGroup      = false;
  isEditIndicator           = false;

  constructor( private legereService: LegereService ) { }

  addIndicatorGroupForm: FormGroup;
  addIndicatorForm: FormGroup;
  addValueForm: FormGroup;

  ngOnInit() {

    this.addIndicatorGroupForm = new FormGroup({
      name:   new FormControl( null, [ ] )
    });

    this.addIndicatorForm = new FormGroup({
      name:   new FormControl( null, [ ] )
    });

    this.addValueForm = new FormGroup({
      value:   new FormControl( null, [ ] )
    });

  }

  onSubmitingProvincia(){

    this.isSubmitedProvincia = true;
    this.selectedProvincia = 'TEST';
    this.getIndicatorGroups();

  }

  onSelectIndicatorGroup( indicatorGroup: LegereIndicatorGroup ): void {
    this.selectedIndicatorGroup = indicatorGroup;
  }

  onSelectIndicator( indicator: LegereIndicator ): void {
    this.selectedIndicator = indicator;
    this.getValues()
  }

  onSubmitingIndicatorGroup(){

    this.isSubmitedIndicatorGroup = true;
    this.getIndicators()

  }

  onEditIndicatorGroup(){

    this.isEditIndicatorGroup = !this.isEditIndicatorGroup;
    console.log('isEditIndicatorGroup: ', this.isEditIndicatorGroup);
    return this.isEditIndicatorGroup

  }

  onEditIndicator(){

    this.isEditIndicator = !this.isEditIndicator;
    console.log('isEditIndicator: ', this.isEditIndicator);
    return this.isEditIndicator

  }

  postIndicatorGroup(){

    const legereIndicatorGroup = new LegereIndicatorGroup(
      this.addIndicatorGroupForm.get('name').value
    );

    this.legereService.postIndicatorGroup( legereIndicatorGroup )
      .subscribe(
        data => {
          this.addIndicatorGroupForm.reset();
          this.getIndicatorGroups()
        },
        error => {}
      );


  }

  getIndicatorGroups(){
    this.legereService.getIndicatorGroup()
      .subscribe(
        ( legereindicatorgroups: LegereIndicatorGroup[]) => {
          this.legereindicatorgroups = legereindicatorgroups;
          return this.legereindicatorgroups
        }
      );
  }

  postValue(){

    const legereValue = new LegereValue(
      this.selectedIndicator.id,
      this.selectedProvincia,
      this.addValueForm.get('value').value,
      this.date
    );

    this.legereService.postValue( legereValue )
      .subscribe(
        data => {
          this.addValueForm.reset();
          this.getValues()
        },
        error => {}
      );

  }

  getValues(){

    console.log('getValues');

    const legereIndicator = new LegereIndicator(
      '',
      '',
      '',
      this.selectedIndicator.id
    );

    this.legereService.getValuesById( legereIndicator )
      .subscribe(
        ( legerevalues: LegereValue[]) => {
          this.legerevalues = legerevalues;
          return this.legerevalues
        }
      );
  }

  postIndicator(){

    const legereIndicator = new LegereIndicator(
      this.selectedIndicatorGroup.id,
      this.addIndicatorForm.get('name').value,
      this.date
    );

    this.legereService.postIndicator( legereIndicator )
      .subscribe(
        data => {
          this.addIndicatorForm.reset();
          this.getIndicators()
        },
        error => {}
      );

  }

  getIndicators(){

    const legereIndicatorGroup = new LegereIndicatorGroup(
      this.selectedIndicatorGroup.name,
      this.selectedIndicatorGroup.id
    );

    this.legereService.getIndicatorsById( legereIndicatorGroup )
      .subscribe(
        ( legereindicators: LegereIndicator[]) => {
          this.legereindicators = legereindicators;
          return this.legereindicators
        }
      );
  }

}
