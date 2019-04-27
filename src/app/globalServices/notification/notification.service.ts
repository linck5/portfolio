import { Injectable } from '@angular/core';
declare var jquery: any;
declare var $: any;

export enum NotificationType {
  Primary = 'primary',
  Secondary = 'secondary',
  Success = 'success',
  Danger = 'danger',
  Warning = 'warning',
  Info = 'info',
  Light = 'light',
  Dark = 'dark',
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  public notify(text:string, type:NotificationType) {
    $.notify({
      // options
      message: text
    },{
      // settings
      type: type,
      delay: 2000,
      timer: 100,
      allow_dismiss: false,
      mouse_over: 'pause',
      placement: {
        from: "bottom",
        align: "left"
      },
      animate: {
        enter: 'animated faster fadeInUp',
        exit: 'animated faster fadeOutDown'
      }
    });
  }
}
