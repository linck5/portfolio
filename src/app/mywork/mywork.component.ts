import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import axios from 'axios';

var url = environment.api_url + '/projects'

@Component({
  selector: 'app-mywork',
  templateUrl: './mywork.component.html',
  styleUrls: ['./mywork.component.scss']
})
export class MyworkComponent implements OnInit {

  project = "fff"

  constructor() { }

  ngOnInit() {
    axios.get(url)
      .then(res => {
        console.log(res)
      })
      .catch(err => { console.error(err) });
  }

}
