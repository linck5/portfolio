import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mywork'
})
export class MyworkPipe implements PipeTransform {

  transform(works: any, type: any): any {
    if(type == undefined || type == "all") return works;

    return works.filter(work => {
      return work.type == type
    })
  }

}
