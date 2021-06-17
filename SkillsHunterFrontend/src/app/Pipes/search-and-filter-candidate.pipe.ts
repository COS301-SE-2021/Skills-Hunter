import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchAndFilterCandidate'
})
export class SearchAndFilterCandidatePipe implements PipeTransform {

  
  // transform(value: Array<string>, args: any[]): any {
  transform(value: any[], filterString: string, propertyToFilter: string): any[] {
    const resultArray = [];

    // const sortField = args[0];
    // const sortDirection = args[1];
    // let multiplier = 1;

    // if(sortDirection === 'desc')
    //   multiplier = 1;

    // value.sort((a : any, b : any) => {
    //   if(a[sortField] < b[sortField])
    //     return -1*multiplier;
    //   else if (a[sortField] < b[sortField])
    //     return 1*multiplier;
    //   else
    //     return 0;
    // }
    // );


    if(value.length === 0 || filterString==='' || propertyToFilter==='')
      return value;

    for(const item of value){
      // if(item[propertyToFilter] === filterString)
      if(filterString.includes(item[propertyToFilter]))
        resultArray.push(item);
    }

    return resultArray;
  }

}
