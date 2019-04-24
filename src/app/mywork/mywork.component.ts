import { Component, OnInit, NgModule } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core'
import { MyworkPipe } from './mywork.pipe'
import { HttpService } from 'src/app/globalServices/http-service/http.service'


interface Work {
  title:string;
  imageUrl?:string;
  description:string;
  type:string;
  workUrl?:string;
  videoUrl?:string;
  sourceCodeUrl?:string;
}

@Component({
  selector: 'app-mywork',
  templateUrl: './mywork.component.html',
  styleUrls: ['./mywork.component.scss']
})
export class MyworkComponent implements OnInit {



  worksData:any;


  works:Work[] = []

  isFirstOnLangChangeEvent = true;

  workType:string = "all";

  private onLangChange(event: LangChangeEvent) {

    if(!this.isFirstOnLangChangeEvent){
      this.updateWorks(event.lang)
    }

    this.isFirstOnLangChangeEvent = false;
  }

  private updateWorks(lang){
    console.log(lang)

    this.works = []

    const i18nProps = ["title", "imageUrl", "description", "type", "workUrl", "sourceCodeUrl"]
    const otherProps = ["type", "date", ]

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
    console.log(this.works[2].sourceCodeUrl)

    this.worksData = await this.httpService.get("/projects").toPromise()

    this.updateWorks("en")
  }

}
