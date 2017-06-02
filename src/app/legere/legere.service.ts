import { Injectable }               from "@angular/core";
import { Http, Headers, Response }  from "@angular/http";
import 'rxjs/Rx';
import { Observable }               from "rxjs";

import { LegereValue, LegereIndicator, LegereIndicatorGroup, LegereProvincia } from "./legere.model";

import config                       from '../../../config/config.json';

@Injectable()
export class LegereService {

  private legereprovincias: LegereProvincia[] = [];
  private legereindicatorgroups: LegereIndicatorGroup[] = [];
  private legereindicators: LegereIndicator[] = [];
  private legerevalues: LegereValue[] = [];

  constructor( private http: Http ) { }

  // Добавить значение показателя
  postValue
  ( legereValue: LegereValue ) {

    const body = JSON.stringify( legereValue );
    const headers = new Headers({'Content-Type': 'application/json'});

    return this.http.post('http://' + config.serverHost + '/legere/value', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  // Получить значения показателей по ID показателя и ID филиала
  getValuesByProvincia
  ( legereValue: LegereValue ) {

    const headers = new Headers({'Content-Type': 'application/json'});

    return this.http.get('http://' + config.serverHost + '/legere/fromprovincia/' + legereValue.provinciaId + '&' + legereValue.indicatorId, {headers: headers})
      .map((response: Response) => {
        const legerevalues = response.json().obj;
        let transformedLegereValues: LegereValue[] = [];
        for (let legerevalue of legerevalues) {
          transformedLegereValues.push(new LegereValue(
            legerevalue.groupId,
            legerevalue.provinciaId,
            legerevalue.value,
            legerevalue.date,
            legerevalue._id
            )
          );
        }
        this.legerevalues = transformedLegereValues;
        return transformedLegereValues;
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }

  // Получить значения показателей по ID показателя для всех филиалов
  getValuesById
  ( legereValue: LegereValue ) {

    const headers = new Headers({'Content-Type': 'application/json'});

    return this.http.get('http://' + config.serverHost + '/legere/fromindicator/' + legereValue.indicatorId, {headers: headers})
      .map((response: Response) => {
        const legerevalues = response.json().obj;
        let transformedLegereValues: LegereValue[] = [];
        for (let legerevalue of legerevalues) {
          transformedLegereValues.push(new LegereValue(
            legerevalue.groupId,
            legerevalue.provinciaId,
            legerevalue.value,
            legerevalue.date,
            legerevalue._id
            )
          );
        }
        this.legerevalues = transformedLegereValues;
        return transformedLegereValues;
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }

  // Добавить показатель
  postIndicator
  ( legereIndicator: LegereIndicator ) {

    const body = JSON.stringify( legereIndicator );
    const headers = new Headers({'Content-Type': 'application/json'});
    console.log(body);

    return this.http.post('http://' + config.serverHost + '/legere/indicator', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  // Получить показатели по ID группы
  getIndicatorsById
  ( legereIndicatorGroup: LegereIndicatorGroup ) {

    const headers = new Headers({'Content-Type': 'application/json'});

    return this.http.get('http://' + config.serverHost + '/legere/fromgroup/' + legereIndicatorGroup.id, {headers: headers})
      .map((response: Response) => {
        const legereindicators = response.json().obj;
        let transformedLegereIndicators: LegereIndicator[] = [];
        for (let legereindicator of legereindicators) {
          transformedLegereIndicators.push(new LegereIndicator(
            legereindicator.groupId,
            legereindicator.name,
            legereindicator.lastUpdated,
            legereindicator._id
            )
          );
        }
        this.legereindicatorgroups = transformedLegereIndicators;
        return transformedLegereIndicators;
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }

  // Добавить группу показателей
  postIndicatorGroup
  ( legereIndicatorGroup: LegereIndicatorGroup ) {

    const body = JSON.stringify( legereIndicatorGroup );
    const headers = new Headers({'Content-Type': 'application/json'});

    return this.http.post('http://' + config.serverHost + '/legere/indicator-group', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  // Получить группы показателей
  getIndicatorGroup
  ( ) {

    const headers = new Headers({'Content-Type': 'application/json'});

    return this.http.get('http://' + config.serverHost + '/legere/indicator-group', {headers: headers})
      .map((response: Response) => {
        const legereindicatorgroups = response.json().obj;
        let transformedLegereGroups: LegereIndicatorGroup[] = [];
        for (let legereindicatorgroup of legereindicatorgroups) {
          transformedLegereGroups.push(new LegereIndicatorGroup(
            legereindicatorgroup.name,
            legereindicatorgroup._id
            )
          );
        }
        this.legereindicatorgroups = transformedLegereGroups;
        return transformedLegereGroups;
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }

  // Добавить филиал
  postProvincia
  ( legereProvincia: LegereProvincia ) {

    const body = JSON.stringify( legereProvincia );
    const headers = new Headers({'Content-Type': 'application/json'});

    return this.http.post('http://' + config.serverHost + '/legere/provincia', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  // Получить филиал
  getProvincias
  ( ) {

    const headers = new Headers({'Content-Type': 'application/json'});

    return this.http.get('http://' + config.serverHost + '/legere/provincia', {headers: headers})
      .map((response: Response) => {
        const legereprovincias = response.json().obj;
        let transformedLegereProvincias: LegereIndicatorGroup[] = [];
        for (let legereprovincia of legereprovincias) {
          transformedLegereProvincias.push(new LegereIndicatorGroup(
            legereprovincia.name,
            legereprovincia._id
            )
          );
        }
        this.legereprovincias = transformedLegereProvincias;
        return transformedLegereProvincias;
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }

}
