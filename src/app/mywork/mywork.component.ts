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
  worksData:any;
  orderbyOptions:Array<OrderByOption> = [
      {id: 0, label: "", path: ["MyWork", "OrderBy", "RelevanceLabel"]},
      {id: 1, label: "", path: ["MyWork", "OrderBy", "DateLabel"]},
      {id: 2, label: "", path: ["MyWork", "OrderBy", "AlphabeticalLabel"]}
  ];
  selectedOrderBy:OrderByOption = this.orderbyOptions[0]
  works:Work[] = []
  isFirstOnLangChangeEvent = true;
  workType:string = "all";



  private onLangChange(event: LangChangeEvent) {

    if(!this.isFirstOnLangChangeEvent){
      this.updateWorks(event.lang)
    }

    for (let opt of this.orderbyOptions) {
      opt.label = event.translations[opt.path[0]][opt.path[1]][opt.path[2]]
    }

    this.isFirstOnLangChangeEvent = false;
  }
  private updateWorks(lang){
    this.works = []

    const i18nProps = ["title", "imageUrl", "description", "type", "workUrl", "sourceCodeUrl", "videoUrl"]
    const otherProps = ["type", "date", "relevance"]

    for (let work of this.worksData) {
        let newWork:any = {}
        for (let prop of i18nProps) {
          if(lang == "en"){
            if(work[prop]){
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

    let ulChildren = this.worksUL._results || this.worksUL.children
    let worksULLength = ulChildren.length
    let g = this.resolveGridLayout(worksULLength);
    let liLackingOne = g.rowsLackingOne * (g.columns - 1);

    for (let i = 0; i < worksULLength; i++) {
      let li = ulChildren[i].myworkItem.nativeElement || ulChildren[i]

      let flexBasisPerc  = i < liLackingOne ?
        100 / (g.columns - 1) : 100 / g.columns

      li.parentElement.parentElement.parentElement.style.flex = `1 0 ${flexBasisPerc}%`
    }
  }

  private resolveGridLayout(nOfItems: number){

    let desiredNOfColumns: number;
    let w = document.documentElement.clientWidth

    let breakpoints = [992, 1200, 1500]

    desiredNOfColumns = 1;
    for (let breakpoint of breakpoints) {
        if(w < breakpoint) break
        else desiredNOfColumns++
    }

    while(nOfItems < desiredNOfColumns * 2) desiredNOfColumns--

    let rowsLackingOne = desiredNOfColumns - nOfItems % desiredNOfColumns
    if(desiredNOfColumns == rowsLackingOne) rowsLackingOne = 0

    return {
      columns: desiredNOfColumns,
      rowsLackingOne: rowsLackingOne,
    }
  }

  constructor(public translate: TranslateService, public httpService:HttpService) { }

  ngAfterViewInit(): void {
    this.worksUL.changes.subscribe(c => this.updateGridLayout())
    window.addEventListener('resize', this.updateGridLayout.bind(this))
  }

  async ngOnInit() {
    this.translate.onLangChange.subscribe(this.onLangChange.bind(this))

    this.worksData = await this.httpService.get("/projects").toPromise()

    this.updateWorks(this.translate.currentLang)
  }

}
