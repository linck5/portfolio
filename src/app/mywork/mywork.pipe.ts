import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mywork'
})
export class MyworkPipe implements PipeTransform {

  transform(works: any, type: any, orderBy: any) {
    if(type != undefined && type != "all") {
      works = works.filter(work => {
        return work.type == type
      })
    }

    works = this.sortWorks(orderBy, works)

    return works;
  }

  private sortWorks(opt:any, works:any){
    switch(opt.id){
      case 0:
        return works.sort((a,b) => b.relevance - a.relevance)
      case 1:
        return works.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      case 2:
        return works.sort((a,b) => a.title.localeCompare(b.title))
    }

  }

}
