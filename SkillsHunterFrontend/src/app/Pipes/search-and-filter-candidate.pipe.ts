import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchAndFilterCandidate'
})
export class SearchAndFilterCandidatePipe implements PipeTransform {

  // transform(value: Array<string>, args: any[]): any {
  transform(value: any[], filterString: string): any[] {
    const resultArray = [];

    if(value.length === 0 || filterString==='')
      return value;
    
    const numOfKeysInObject : number = Object.keys(value[0]).length;
    let keyInFocus : string = '';

    for(const item of value){

      for(var key=0; key<numOfKeysInObject; key++){
        
        keyInFocus = ''+ Object.values(item)[key];

          // check if key is an array and process it differently:
          // if(Array.isArray(Object.keys(item)[key])){
          //   console.log("NAZO");
          // }
          // else{
            if(keyInFocus.toLowerCase().includes(filterString.toLowerCase())){
              // add if there are not duplicates:
              if(!this.isDuplicateCardFound(resultArray, item.id))
                resultArray.push(item);
            }
          // }
        }
      }

      return resultArray;
    }


    isDuplicateCardFound(_arr : any[], _id : string): boolean{
      // check for primary key to avoid duplicates:
  
        let bCardExists: boolean = false;

      for(var x=0; x<_arr.length; x++)
            if(_arr[x].id === _id){
                  bCardExists = true;
                  break;
            }

        return bCardExists;
    }


  }

  // isDuplicateCardFound(_arr : any[], _id : string): boolean{
  //   let bCardExists: boolean = false;
    
    // console.log("ID is = "+_id);

    // check for primary key to avoid duplicates:
    // for(var x=0; x<_arr.length; x++)
    //     if(_arr[x].id === _id){
            // console.log("Card is found! ");
        //       bCardExists = true;
        //       break;
        // }

        // console.log("Card is found! ");
    // return bCardExists;
    
// }
