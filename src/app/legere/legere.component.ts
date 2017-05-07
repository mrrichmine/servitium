import { Component, OnInit }        from '@angular/core';
import { FormGroup, FormControl }   from '@angular/forms';

import { LegereValue, LegereIndicator, LegereIndicatorGroup, LegereProvincia } from "./legere.model";

import { LegereService }            from "./legere.service";

@Component({
  selector: 'app-legere',
  templateUrl: './legere.component.html',
  styleUrls: ['./legere.component.css']
})
export class LegereComponent implements OnInit {

  value = '';
  groupId = '';
  date = '';

  legereprovincias: LegereProvincia[];
  legereindicatorgroups: LegereIndicatorGroup[];
  legereindicators: LegereIndicator[];
  legerevalues: LegereValue[];
  legereprintvalues: LegereValue[];

  selectedProvincia: LegereProvincia;
  selectedIndicatorGroup: LegereIndicatorGroup;
  selectedIndicator: LegereIndicator;

  isSubmitedProvincia       = false;
  isSubmitedIndicatorGroup  = false;
  isPrint                   = false;

  isEditProvincia           = false;
  isEditIndicatorGroup      = false;
  isEditIndicator           = false;
  isEditValue               = false;

  constructor( private legereService: LegereService ) { }

  addProvinciaForm: FormGroup;
  addIndicatorGroupForm: FormGroup;
  addIndicatorForm: FormGroup;
  addValueForm: FormGroup;

  ngOnInit() {

    this.addProvinciaForm = new FormGroup({
      name:   new FormControl( null, [ ] )
    });

    this.addIndicatorGroupForm = new FormGroup({
      name:   new FormControl( null, [ ] )
    });

    this.addIndicatorForm = new FormGroup({
      name:   new FormControl( null, [ ] )
    });

    this.addValueForm = new FormGroup({
      value:   new FormControl( null, [ ] )
    });

    this.getProvincias()

  }

  onSelectProvincia( provincia: LegereProvincia ): void {

    this.selectedProvincia = provincia;
    this.isSubmitedProvincia = false;
    this.isSubmitedIndicatorGroup = false;

  }

  onSelectIndicatorGroup( indicatorGroup: LegereIndicatorGroup ): void {

    this.selectedIndicatorGroup = indicatorGroup;
    this.isSubmitedIndicatorGroup = false;

  }

  onSelectIndicator( indicator: LegereIndicator ): void {

    this.selectedIndicator = indicator;
    this.getValuesByProvincia()

  }

  onSubmitingProvincia(){

    this.isSubmitedProvincia = true;
    this.getIndicatorGroups();

  }

  onSubmitingIndicatorGroup(){

    this.isSubmitedIndicatorGroup = true;
    this.getIndicators()

  }

  postProvincia(){

    const legereProvincia = new LegereProvincia(
      this.addProvinciaForm.get('name').value
    );

    this.legereService.postProvincia( legereProvincia )
      .subscribe(
        data => {
          this.addProvinciaForm.reset();
          this.getProvincias()
        },
        error => {}
      );
  }

  getProvincias(){
    this.legereService.getProvincias()
      .subscribe(
        ( legereprovincias: LegereProvincia[]) => {
          this.legereprovincias = legereprovincias;
          return this.legereprovincias
        }
      );
  }

  onEditProvincia(){

    this.isEditProvincia = !this.isEditProvincia;
    return this.isEditProvincia

  }

  onEditIndicatorGroup(){

    this.isEditIndicatorGroup = !this.isEditIndicatorGroup;
    return this.isEditIndicatorGroup

  }

  onEditIndicator(){

    this.isEditIndicator = !this.isEditIndicator;
    return this.isEditIndicator

  }

  onEditValue(){

    this.isEditValue = !this.isEditValue;
    return this.isEditValue

  }

  onPrintIndicatorValues(){

    this.isPrint = !this.isPrint;
    console.log(this.isPrint);
    this.getValuesById( this.legereprovincias );
    return this.isPrint

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
      this.selectedProvincia.id,
      this.addValueForm.get('value').value,
      this.date
    );

    this.legereService.postValue( legereValue )
      .subscribe(
        data => {
          this.addValueForm.reset();
          this.getValuesByProvincia()
        },
        error => {}
      );
  }

  getValuesByProvincia(){

    console.log('getValuesByProvincia');

    const legereValue = new LegereValue(
      this.selectedIndicator.id,
      this.selectedProvincia.id,
      '',
      ''
    );

    this.legereService.getValuesByProvincia( legereValue )
      .subscribe(
        ( legerevalues: LegereValue[]) => {
          this.legerevalues = legerevalues;
          return this.legerevalues
        }
      );
  }

  getValuesById( legereprovincias ){

    console.log('getValuesById');

    const legereValue = new LegereValue(
      this.selectedIndicator.id,
      '',
      '',
      ''
    );

    this.legereService.getValuesById( legereValue )
      .subscribe(
        ( legereprintvalues: LegereValue[]) => {

          this.legereprintvalues = legereprintvalues;
          return this.legereprintvalues
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
