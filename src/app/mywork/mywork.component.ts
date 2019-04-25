import { Component, OnInit, NgModule } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core'
import { MyworkPipe } from './mywork.pipe'
import { HttpService } from 'src/app/globalServices/http-service/http.service'


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

type OrderByOption = {id: number; label: string}

@Component({
  selector: 'app-mywork',
  templateUrl: './mywork.component.html',
  styleUrls: ['./mywork.component.scss']
})
export class MyworkComponent implements OnInit {



  orderbyOptions:Array<OrderByOption> = [
      {id: 0, label: "Relevance"},
      {id: 1, label: "Date"},
      {id: 2, label: "Alphabelical"}
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

  constructor(public translate: TranslateService, public httpService:HttpService) { }

  async ngOnInit() {
    console.log(this.isFirstOnLangChangeEvent)
    this.translate.onLangChange.subscribe(this.onLangChange.bind(this))

    this.worksData = await this.httpService.get("/projects").toPromise()



    this.updateWorks("en")
    this.sortWorks(this.selectedOrderBy)
  }

}
