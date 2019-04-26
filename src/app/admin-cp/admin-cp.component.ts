import { Component, OnInit, Input } from '@angular/core';
import { CredentialsService } from './credentials.service'




@Component({
  selector: 'app-admin-cp',
  templateUrl: './admin-cp.component.html',
  styleUrls: ['./admin-cp.component.scss', './admin-cp.shared.scss']
})
export class AdminCpComponent implements OnInit {

  constructor(private credentialsService:CredentialsService) { }

  ngOnInit() {
  }

  usernameChanged(event){
    this.credentialsService.credentials.username = event.target.value;
  }

  passwordChanged(event){
    this.credentialsService.credentials.password = event.target.value;
  }




}
