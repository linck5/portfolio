import { Component, OnInit, DoCheck } from '@angular/core';
import JSONEditor, { JSONEditorOptions } from 'jsoneditor'
import { HttpService } from 'src/app/globalServices/http-service/http.service';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  i18nItems

  constructor(private httpService: HttpService) {}

  async ngOnInit() {
    this.i18nItems = await this.httpService.get('/i18n').toPromise();
  }
}
