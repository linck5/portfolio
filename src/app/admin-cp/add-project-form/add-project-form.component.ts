import { Component, Input, Output, OnInit, EventEmitter, SimpleChanges } from '@angular/core';
import { HttpService } from 'src/app/globalServices/http-service/http.service'
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
  styleUrls: ['./add-project-form.component.scss', '../admin-cp.shared.scss']
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

  @Input() credentialsForm; //TODO type it
  @Output() projectAdded = new EventEmitter<string>();

  constructor(private httpService: HttpService) { console.log(this.projectForm)}

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
    console.log(this.projectForm)
    await this.postProjectFromForm(this.projectForm)

    this.projectAdded.emit('a');

  }

  private async postProjectFromForm(form){

    console.log(this.credentialsForm)

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

    return this.httpService.post('/projects',projectObj,this.credentialsForm)
    .subscribe(data => console.log(data))
  }


  private yearMonth2Date(year, month){
    return new Date(year, month - 1 /*starts from zero*/, 1);
  }

}
