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
      console.log(JSON.stringify(item["name"]));
  
      // console.log(JSON.stringify(item));


      for(var key=0; key<numOfKeysInObject; key++){

        keyInFocus = Object.keys(item)[key];



        // console.log(keyInFocus);
        // if(item[keyInFocus].includes(filterString)){
        //   resultArray.push(item);
        // }

      }

      // if(item[propertyToFilter].includes(filterString))
      //   resultArray.push(item);
    }

    return resultArray;
  }

}
