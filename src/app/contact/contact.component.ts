import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
declare var google:any

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor() {
    $(function () {
        function initMap() {
          var uluru = {lat: -26.2717061, lng: -47.9335963};
          var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 7,
            center: uluru,
            scrollwheel: false,
            zoomControlOptions: {
                position: google.maps.ControlPosition.LEFT_BOTTOM
            },
            streetViewControl: false,
            mapTypeControl: false
          });
          var marker = new google.maps.Marker({
            position: {lat: -26.489922, lng: -49.077456},
            map: map
          });

        }

        google.maps.event.addDomListener(window, 'load', initMap);
    });
  }

  ngOnInit() {
  }

}
