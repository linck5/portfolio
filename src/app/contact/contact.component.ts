import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { mapStyle } from './googleMapsStyle'
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
            zoom: 6,
            center: uluru,
            scrollwheel: true,
            zoomControl: false,
            // zoomControlOptions: {
            //     position: google.maps.ControlPosition.LEFT_BOTTOM
            // },
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            styles: mapStyle
          });
          var marker = new google.maps.Marker({
            icon: 'assets/svgs/map-marker.svg',
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
