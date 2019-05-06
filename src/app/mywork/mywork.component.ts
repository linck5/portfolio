import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit, QueryList } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core'
import { HttpService } from 'src/app/globalServices/http-service/http.service'
import { MyworkItemComponent } from './mywork-item/mywork-item.component'

interface Work {
  title:string;
  imageUrl?:string;
  description:string;
  type:string;
  date:Date;
  workUrl?:string;
  videoUrl?:string;
  sourceCodeUrl?:string;
  relevance?:number;

}

type OrderByOption = {id: number; label: string, path:string[]}

@Component({
  selector: 'app-mywork',
  templateUrl: './mywork.component.html',
  styleUrls: ['./mywork.component.scss']
})
export class MyworkComponent implements OnInit, AfterViewInit {


  @ViewChildren(MyworkItemComponent) worksUL: any;

  orderbyOptions:Array<OrderByOption> = [
      {id: 0, label: "", path: ["MyWork", "OrderBy", "RelevanceLabel"]},
      {id: 1, label: "", path: ["MyWork", "OrderBy", "DateLabel"]},
      {id: 2, label: "", path: ["MyWork", "OrderBy", "AlphabeticalLabel"]}
  ];

  selectedOrderBy:OrderByOption = this.orderbyOptions[0]


  worksData:any;


  works:Work[] = []

  isFirstOnLangChangeEvent = true;

  workType:string = "all";



  private sortWorks(opt:OrderByOption){
    switch(opt.id){
      case 0:
        this.works.sort((a,b) => b.relevance - a.relevance)
        break
      case 1:
        this.works.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        break
      case 2:
        this.works.sort((a,b) => a.title.localeCompare(b.title))
    }
  }

  public orderbyHandler(){
    this.sortWorks(this.selectedOrderBy)
  }

  private onLangChange(event: LangChangeEvent) {

    if(!this.isFirstOnLangChangeEvent){
      this.updateWorks(event.lang)
      this.sortWorks(this.selectedOrderBy)
    }

    for (let opt of this.orderbyOptions) {
        opt.label = event.translations[opt.path[0]][opt.path[1]][opt.path[2]]
    }

    //this.orderbyOptions[0].label = event.translations.MyWork.OrderByRelevanceLabel
    console.log(event)

    this.isFirstOnLangChangeEvent = false;
  }
  private updateWorks(lang){
    console.log(lang)

    this.works = []

    const i18nProps = ["title", "imageUrl", "description", "type", "workUrl", "sourceCodeUrl"]
    const otherProps = ["type", "date", "relevance"]

    for (let work of this.worksData) {
        let newWork:any = {}
        for (let prop of i18nProps) {
          if(lang == "en"){
            if(work[prop]){
              console.log("here")
              newWork[prop] = work[prop]
            }
          }
          else{
            if(work.i18n && work.i18n[lang] && work.i18n[lang][prop]){
              newWork[prop] = work.i18n[lang][prop]
            }
            else if(work[prop]){
              newWork[prop] = work[prop]
            }
          }
        }
        for (let prop of otherProps) {
          newWork[prop] = work[prop]
        }
        this.works.push(newWork)
    }

  }

  private updateGridLayout(){
    console.dir(this.worksUL)

    let worksULLength = this.worksUL._results.length
    console.log("worksULLength ", worksULLength)

    let g = this.resolveGridLayout(worksULLength, 4);

    let liLackingOne = g.rowsLackingOne * (g.columns - 1);
    console.log("liLackingOne ", liLackingOne)

    let i = 0;
    for (let resultsItem of this.worksUL._results) {
      let li = resultsItem.myworkItem.nativeElement

        let flexStr;

        if(i < liLackingOne){
          flexStr = '1 0 ' + 100 / (g.columns - 1) + '%'
        }
        else {
          flexStr = '1 0 ' + 100 / g.columns + '%'
        }
        console.log("i" + i + " " + flexStr)
        li.parentElement.parentElement.style.flex = flexStr

        i++;
    }

  }

  private resolveGridLayout(numberOfItems, desiredNumberOfColumns){ //TODO cleanup
    let n = numberOfItems;
    let c = desiredNumberOfColumns;
    while(n < c) c--;

    let rowsLackingOne = c - n % c;
    if(c == rowsLackingOne) rowsLackingOne = 0;

    return {
      columns: c,
      rowsLackingOne: rowsLackingOne,
    }
  }

  constructor(public translate: TranslateService, public httpService:HttpService) { }

  ngAfterViewInit(): void {
    this.worksUL.changes.subscribe((c) => {
      console.log(c)
      this.updateGridLayout()
    })
    //window.addEventListener('resize', this.updateGridLayout)
  }


  async ngOnInit() {



    console.log(this.isFirstOnLangChangeEvent)
    this.translate.onLangChange.subscribe(this.onLangChange.bind(this))

    this.worksData = await this.httpService.get("/projects").toPromise()



    this.updateWorks("en")
    this.sortWorks(this.selectedOrderBy)
  }

}
