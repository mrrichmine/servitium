export class LegereValue {
  constructor( public indicatorId:  any,
               public provinciaId:  any,
               public value:        any,
               public date:         any,
               public id?:          any
  ){}
}

export class LegerePrintValue {
  constructor( public indicatorId:    any,
               public provinciaId:    any,
               public value:          any,
               public date?:          any,
               public id?:            any,
               public provinciaName?: any,

  ){}
}

export class LegereIndicator {
  constructor( public groupId:      any,
               public name:         any,
               public lastUpdated:  any,
               public id?:          any
  ){}
}

export class LegereIndicatorGroup {
  constructor( public name:         any,
               public id?:          any
  ){}
}

export class LegereProvincia {
  constructor( public name:         any,
               public id?:          any
  ){}
}

