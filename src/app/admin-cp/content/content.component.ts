import { Component, OnInit } from '@angular/core';
import JSONEditor, { JSONEditorOptions } from 'jsoneditor'


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var container = document.getElementById("jsoneditor");
    var options:JSONEditorOptions = {
        mode: 'tree'
    };
    var editor = new JSONEditor(container, options);


    var json = {
      "Array": [1, 2, 3],
      "Boolean": true,
      "Null": null,
      "Number": 123,
      "Object": {"a": "b", "c": "d"},
      "String": "Hello World"
    };
    editor.set(json);
  }

}
