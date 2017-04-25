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

  isSubmitedProvincia = false;
  selectedIndicatorGroup: LegereIndicatorGroup;
  isSubmitedIndicatorGroup = false;
  isAllowedEdit     = false;

  constructor( private legereService: LegereService ) { }

  legereForm: FormGroup;
  addIndicatorGroupForm: FormGroup;
  addIndicatorForm: FormGroup;

  ngOnInit() {

    this.legereForm  = new FormGroup({
      value:  new FormControl( null, [ ] )
    });

    this.addIndicatorGroupForm = new FormGroup({
      name:   new FormControl( null, [ ] )
    });

    this.addIndicatorForm = new FormGroup({
      name:   new FormControl( null, [ ] )
    });

  }

  onSubmitingProvincia(){

    this.isSubmitedProvincia = true;
    this.getIndicatorGroups()

  }

  onSelect( indicatorGroup: LegereIndicatorGroup ): void {
    this.selectedIndicatorGroup = indicatorGroup;
  }

  onSubmitingIndicatorGroup(){

    this.isSubmitedIndicatorGroup = true;
    this.getIndicators()

  }

  onChangingMode(){

    this.isAllowedEdit = !this.isAllowedEdit;
    console.log('isAllowedEdit: ', this.isAllowedEdit);
    return this.isAllowedEdit

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
