export class ColloquimMessage {
  constructor( public text:     string,
               public creator:  string,
               public date:     any,
               public room?:    string
  ){}
}
