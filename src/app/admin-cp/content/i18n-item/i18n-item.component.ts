import { Component, OnInit, ViewChild, Input } from '@angular/core'
import { HttpService } from 'src/app/globalServices/http-service/http.service'
import { CredentialsService } from '../../credentials.service'
import JSONEditor, { JSONEditorOptions } from 'jsoneditor'
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-i18n-item',
  templateUrl: './i18n-item.component.html',
  styleUrls: ['./i18n-item.component.scss']
})
export class I18nItemComponent implements OnInit {

  @ViewChild('jsoneditorcontainer') jsoneditorcontainer;
  @Input() unmodifiedI18nItem: any;

  jsonEditorContentChanged = false;
  editor: JSONEditor

  constructor(private httpService: HttpService, private credentialsService:CredentialsService) { }

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
    $.notify({
    	// options
    	message: 'Hello World'
    },{
    	// settings
    	type: 'danger'
    });
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
