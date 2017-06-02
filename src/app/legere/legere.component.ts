import {Component, OnInit}        from '@angular/core';
import {FormGroup, FormControl}   from '@angular/forms';

import * as moment from 'moment';

import {LegereValue, LegerePrintValue, LegereIndicator, LegereIndicatorGroup, LegereProvincia} from "./legere.model";

import {LegereService}            from "./legere.service";

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
  legereprintvalues: LegerePrintValue[];

  selectedProvincia: LegereProvincia;
  selectedIndicatorGroup: LegereIndicatorGroup;
  selectedIndicator: LegereIndicator;

  isSubmitedProvincia = false;
  isSubmitedIndicatorGroup = false;

  isEditMode = false;
  isFillingMode = false;
  isPrint = false;

  isEditProvincia = false;
  isEditIndicatorGroup = false;
  isEditIndicator = false;
  isEditValue = false;

  constructor(private legereService: LegereService) {
  }

  addProvinciaForm: FormGroup;
  addIndicatorGroupForm: FormGroup;
  addIndicatorForm: FormGroup;
  addValueForm: FormGroup;

  ngOnInit() {

    this.addProvinciaForm = new FormGroup({
      name: new FormControl(null, [])
    });

    this.addIndicatorGroupForm = new FormGroup({
      name: new FormControl(null, [])
    });

    this.addIndicatorForm = new FormGroup({
      name: new FormControl(null, [])
    });

    this.addValueForm = new FormGroup({
      value: new FormControl(null, [])
    });

    this.getProvincias()

  }

  onSelectProvincia(provincia: LegereProvincia): void {

    this.selectedProvincia = provincia;
    this.isSubmitedProvincia = false;
    this.isSubmitedIndicatorGroup = false;
    this.isPrint = false;

  }

  onSelectIndicatorGroup(indicatorGroup: LegereIndicatorGroup): void {

    this.selectedIndicatorGroup = indicatorGroup;
    this.isSubmitedIndicatorGroup = false;
    this.isPrint = false;

  }

  onSelectIndicator(indicator: LegereIndicator): void {

    this.selectedIndicator = indicator;
    this.getValuesByProvincia();

    if (this.isPrint) {

      this.getValuesById();

    }

  }

  onSubmitingProvincia() {

    this.isSubmitedProvincia = true;
    this.getIndicatorGroups();

  }

  onSubmitingIndicatorGroup() {

    this.isSubmitedIndicatorGroup = true;
    this.getIndicators()

  }

  postProvincia() {

    const legereProvincia = new LegereProvincia(
      this.addProvinciaForm.get('name').value
    );

    this.legereService.postProvincia(legereProvincia)
      .subscribe(
        data => {
          this.addProvinciaForm.reset();
          this.getProvincias()
        },
        error => {
        }
      );
  }

  getProvincias() {
    this.legereService.getProvincias()
      .subscribe(
        (legereprovincias: LegereProvincia[]) => {
          this.legereprovincias = legereprovincias;
          return this.legereprovincias
        }
      );
  }

  onEditMode() {

    this.isEditMode = !this.isEditMode;
    return this.isEditMode

  }

  onFillingMode() {

    this.isFillingMode = !this.isFillingMode;
    return this.isFillingMode

  }

  onEditProvincia() {

    this.isEditProvincia = !this.isEditProvincia;
    return this.isEditProvincia

  }

  onEditIndicatorGroup() {

    this.isEditIndicatorGroup = !this.isEditIndicatorGroup;
    return this.isEditIndicatorGroup

  }

  onEditIndicator() {

    this.isEditIndicator = !this.isEditIndicator;
    return this.isEditIndicator

  }

  onEditValue() {

    this.isEditValue = !this.isEditValue;
    return this.isEditValue

  }

  onPrintIndicatorValues() {

    this.isPrint = !this.isPrint;

    this.getValuesById();

    return this.isPrint

  }

  representValuesForPrint(legereprintvalues, legereprovincias) {

    for (let i = 0; i < legereprintvalues.length; i++) {

      // Moment.JS: Локализация и перевод даты ISO-формата в удобный вид
      moment.locale('ru');
      legereprintvalues[i].date = moment(legereprintvalues[i].date).format('llll');

      // Подстановка наименования филиала в массив значений
      for (let j = 0; j < legereprovincias.length; j++) {
        if (legereprintvalues[i].provinciaId == legereprovincias[j].id) {
          legereprintvalues[i].provinciaName = legereprovincias[j].name
        }
      }

    }

    // Сортировка массива по наименованию филиала
    Array.prototype.sort.call( legereprintvalues, function ( a, b ) {
      return a[5] > b[5] ? 1 : a[5] < b[5] ? -1 : 0;
    });

    this.legereprintvalues = legereprintvalues;

    return this.legereprintvalues

  }

  postIndicatorGroup() {

    const legereIndicatorGroup = new LegereIndicatorGroup(
      this.addIndicatorGroupForm.get('name').value
    );

    this.legereService.postIndicatorGroup(legereIndicatorGroup)
      .subscribe(
        data => {
          this.addIndicatorGroupForm.reset();
          this.getIndicatorGroups()
        },
        error => {
        }
      );
  }

  getIndicatorGroups() {
    this.legereService.getIndicatorGroup()
      .subscribe(
        (legereindicatorgroups: LegereIndicatorGroup[]) => {
          this.legereindicatorgroups = legereindicatorgroups;
          return this.legereindicatorgroups
        }
      );
  }

  postValue() {

    const legereValue = new LegereValue(
      this.selectedIndicator.id,
      this.selectedProvincia.id,
      this.addValueForm.get('value').value,
      this.date
    );

    this.legereService.postValue(legereValue)
      .subscribe(
        data => {
          this.addValueForm.reset();
          this.getValuesByProvincia()
        },
        error => {
        }
      );

    if (this.isPrint) {
      this.getValuesById();
    }

  }

  getValuesByProvincia() {

    const legereValue = new LegereValue(
      this.selectedIndicator.id,
      this.selectedProvincia.id,
      '',
      ''
    );

    this.legereService.getValuesByProvincia(legereValue)
      .subscribe(
        (legerevalues: LegereValue[]) => {
          this.legerevalues = legerevalues;
          return this.legerevalues
        }
      );
  }

  getValuesById() {

    const legereValue = new LegereValue(
      this.selectedIndicator.id,
      '',
      '',
      ''
    );

    this.legereService.getValuesById(legereValue)
      .subscribe(
        (legerevalues: LegereValue[]) => {

          this.legereprintvalues = legerevalues;

          this.representValuesForPrint(this.legereprintvalues, this.legereprovincias);

          return this.legereprintvalues
        }
      );
  }

  postIndicator() {

    const legereIndicator = new LegereIndicator(
      this.selectedIndicatorGroup.id,
      this.addIndicatorForm.get('name').value,
      this.date
    );

    this.legereService.postIndicator(legereIndicator)
      .subscribe(
        data => {
          this.addIndicatorForm.reset();
          this.getIndicators()
        },
        error => {
        }
      );

  }

  getIndicators() {

    const legereIndicatorGroup = new LegereIndicatorGroup(
      this.selectedIndicatorGroup.name,
      this.selectedIndicatorGroup.id
    );

    this.legereService.getIndicatorsById(legereIndicatorGroup)
      .subscribe(
        (legereindicators: LegereIndicator[]) => {
          this.legereindicators = legereindicators;
          return this.legereindicators
        }
      );
  }

}
