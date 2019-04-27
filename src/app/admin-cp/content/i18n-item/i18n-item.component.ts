import { Component, OnInit, ViewChild, Input } from '@angular/core'
import { HttpService } from 'src/app/globalServices/http-service/http.service'
import { NotificationService, NotificationType } from 'src/app/globalServices/notification/notification.service'
import { CredentialsService } from '../../credentials.service'
import JSONEditor, { JSONEditorOptions } from 'jsoneditor'


@Component({
  selector: 'app-i18n-item',
  templateUrl: './i18n-item.component.html',
  styleUrls: ['./i18n-item.component.scss'/*, '../../../../../node_modules/animate.css/animate.css'*/]
})
export class I18nItemComponent implements OnInit {

  @ViewChild('jsoneditorcontainer') jsoneditorcontainer;
  @Input() unmodifiedI18nItem: any;

  jsonEditorContentChanged = false;
  editor: JSONEditor

  constructor(
    private httpService: HttpService,
    private credentialsService:CredentialsService,
    private notificationService:NotificationService
  ) { }

  ngOnInit() {
    let container = this.jsoneditorcontainer.nativeElement
    let options:JSONEditorOptions = {
        language: 'en',
        mainMenuBar: false,
        mode: 'tree',
        onChange: () => {
          this.jsonEditorContentChanged = true;
        }
    };
    this.editor = new JSONEditor(container, options);

    this.editor.set(this.unmodifiedI18nItem)
  }

  reset(){
    this.notificationService.notify("Document has been reset.", NotificationType.Info)
    this.editor.set(this.unmodifiedI18nItem)
    this.jsonEditorContentChanged = false;
  }

  async submit(){
    let i18nToPost = this.editor.get()

    let res = await this.httpService.post(
      '/i18n/' + i18nToPost._lang,
      i18nToPost,
      this.credentialsService.credentials
    ).toPromise();

    console.log(res)

    this.unmodifiedI18nItem = i18nToPost
    this.jsonEditorContentChanged = false
  }

}
