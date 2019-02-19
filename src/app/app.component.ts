import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'
import AOS from 'aos'
import * as $ from 'jquery';
declare var google:any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'portfolio';

  constructor(translate: TranslateService) {
      // this language will be used as a fallback when a translation isn't found in the current language
      translate.setDefaultLang('en');

       // the lang to use, if the lang isn't available, it will use the current loader to get them
      translate.use('en');


      AOS.init({
        duration: 400,
        offset: 150,
        easing: 'ease-out-sine',
        once: true
      })

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
}
