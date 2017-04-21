export class LegereValue {
  constructor( public value:    any,
               public date:     any
  ){}
}

export class LegereIndicator {
  constructor( public valueID:      any,
               public name:         string,
               public lastUpdated:  any
  ){}
}

export class LegereIndicatorGroup {
  constructor( public indicatorID:    any,
               public name:           string
  ){}
}

