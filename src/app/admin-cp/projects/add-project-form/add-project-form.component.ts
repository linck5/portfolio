import { Component, Input, Output, OnInit, EventEmitter, SimpleChanges } from '@angular/core';
import { HttpService } from 'src/app/globalServices/http-service/http.service'
import { NotificationService, NotificationType } from 'src/app/globalServices/notification/notification.service'
import { CredentialsService } from '../../credentials.service'
import { secondaryLanguages } from 'src/app/language-support'


type ProjectFormI18n = {
  title?: string,
  description?: string,
  imageUrl?: string,
  workUrl?: string,
  videoUrl?: string,
  sourceCodeUrl?: string
}

export class ProjectForm {

  constructor(
    public title: string,
    public year: number,
    public month: number,
    public description: string,
    public type: string,
    public i18n?: {[lang:string]: ProjectFormI18n},
    public imageUrl?: string,
    public workUrl?: string,
    public sourceCodeUrl?: string,
    public relevance?:number

  ) {
    this.i18n = {}
    for (let lang of secondaryLanguages){
      this.i18n[lang] = {}
    }
  }

}

@Component({
  selector: 'app-add-project-form',
  templateUrl: './add-project-form.component.html',
  styleUrls: ['./add-project-form.component.scss', '../../admin-cp.shared.scss']
})
export class AddProjectFormComponent implements OnInit {

  public projectForm:ProjectForm = new ProjectForm('', 2000, 1, '', 'web');
  @Input() public copiedProjectData;

  public test = ""

  public formTemplate = [
    {name: 'title', label: 'Title'},
    {name: 'year', label: 'Year (YYYY)'},
    {name: 'month', label: 'Month (1 to 12)'},
    {name: 'description', label: 'Description'},
    {name: 'type', label: 'Type (web || gamedev || ml)'},
    {name: 'imageUrl', label: 'Image URL'},
    {name: 'workUrl', label: 'Project URL'},
    {name: 'videoUrl', label: 'Demo Video URL'},
    {name: 'sourceCodeUrl', label: 'Source Code URL'},
    {name: 'relevance', label: 'Relevance'},
    {name: 'i18n', languages: secondaryLanguages.map((lang) => {
      return {
        lang: lang,
        template: [
          {name: 'title', label: 'Title'},
          {name: 'description', label: 'Description'},
          {name: 'imageUrl', label: 'Image URL'},
          {name: 'workUrl', label: 'Project URL'},
          {name: 'videoUrl', label: 'Demo Video URL'},
          {name: 'sourceCodeUrl', label: 'Source Code URL'},
        ]
      }
    })},
  ]

  @Output() projectAdded = new EventEmitter<string>();

  constructor(
    private httpService: HttpService,
    private credentialsService:CredentialsService,
    private notificationService:NotificationService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.copiedProjectData && changes.copiedProjectData.currentValue){

      let newFormData:any = {}
      Object.assign(newFormData, changes.copiedProjectData.currentValue)

      if(newFormData.date){
        newFormData.year = new Date(newFormData.date).getFullYear()
        newFormData.month = new Date(newFormData.date).getMonth() + 1
      }
      this.projectForm = newFormData
    }
  }

  public langPlusTemplatePropertyName(lang, propName){
    return `${lang}-${propName}`
  }

  async onSubmit() {
    let res:any = await this.buildPostProjectFromFormObservable(this.projectForm)
    .toPromise()
    .catch((err)=>{
      console.log(err)
      this.notificationService.notify(
        `Error: ${err.status} ${err.statusText}. See console for more info.`,
        NotificationType.Danger, 2.5)
    })
    if(res){
      if(res.errors){
        console.log(res)
        this.notificationService.notify(
          `Error: ${res.message} See console for more info.`,
          NotificationType.Warning, 2.5)
      }
      else{
        this.notificationService.notify(
          "Success. Project uploaded.",
          NotificationType.Success)
        this.projectAdded.emit('a');
      }
    }
  }

  private buildPostProjectFromFormObservable(form){

    let projectObj = {
      "title": form.title,
      "date": this.yearMonth2Date(form.year, form.month),
      "imageUrl": form.imageUrl,
      "description": form.description,
      "type": form.type,
      "workUrl": form.workUrl,
      "videoUrl": form.videoUrl,
      "sourceCodeUrl": form.sourceCodeUrl,
      "relevance": form.relevance,
      "i18n": form.i18n,
    }

    return this.httpService.post('/projects', projectObj, this.credentialsService.credentials)
  }


  private yearMonth2Date(year, month){
    return new Date(year, month - 1 /*starts from zero*/, 1);
  }

}
