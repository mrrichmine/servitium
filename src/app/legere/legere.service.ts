import { Injectable }               from "@angular/core";
import { Http, Headers, Response }  from "@angular/http";
import 'rxjs/Rx';
import { Observable }               from "rxjs";

import { LegereValue, LegereIndicator, LegereIndicatorGroup } from "./legere.model";

import config                       from '../../../config/config.json';

@Injectable()
export class LegereService {

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

  // Получить значения показателей по ID показателя
  getValuesById
  ( legereIndicator: LegereIndicator ) {

    const headers = new Headers({'Content-Type': 'application/json'});

    return this.http.get('http://' + config.serverHost + '/legere/fromindicator/' + legereIndicator.id, {headers: headers})
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




}
