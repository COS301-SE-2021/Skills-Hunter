import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchAndFilterCandidate'
})
export class SearchAndFilterCandidatePipe implements PipeTransform {

  
  // transform(value: Array<string>, args: any[]): any {
  transform(value: any[], filterString: string, propertyToFilter: string): any[] {
    const resultArray = [];

    if(value.length === 0 || filterString==='' || propertyToFilter==='')
      return value;

      // id: number;
      // name: string;
      // job: string
      // description: string;
      // skills: string;
    
    const numOfKeysInObject : number = Object.keys(value[0]).length;
    let keyInFocus : string = '';

    for(const item of value){

      for(var key=0; key<numOfKeysInObject; key++){
        
        keyInFocus = ''+ Object.values(item)[key];
        let bCardExists = false;

        // Object.values(item)[0]

        if(keyInFocus.toLowerCase().includes(filterString.toLowerCase())){
          
          // check for primary key to avoid duplicates:
          for(var x=0; x<resultArray.length; x++){
            if(resultArray[x].id === Object.values(item)[0]){
                  bCardExists = true;
                  break;
            }
          }

          // add if there are not duplicates:
          if(!bCardExists)
            resultArray.push(item);
        }

      }

    }

    return resultArray;
  }


}
