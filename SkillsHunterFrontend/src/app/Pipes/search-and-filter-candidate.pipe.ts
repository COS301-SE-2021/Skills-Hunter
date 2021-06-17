import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchAndFilterCandidate'
})
export class SearchAndFilterCandidatePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
