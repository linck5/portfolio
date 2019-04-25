import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'app-admin-cp',
  templateUrl: './admin-cp.component.html',
  styleUrls: ['./admin-cp.component.scss', './admin-cp.shared.scss']
})
export class AdminCpComponent implements OnInit {

  public credentialsForm = {username: '', password: ''};

  constructor() { }

  ngOnInit() {
  }






}
