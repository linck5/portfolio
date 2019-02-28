import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { AppRoutingModule } from './app-routing.module';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CoverComponent } from './cover/cover.component';
import { MyworkComponent } from './mywork/mywork.component';
import { ContactComponent } from './contact/contact.component';
import { LayoutComponent } from './layout/layout.component';



export class ServerApiLoader implements TranslateLoader {

  constructor(private http: HttpClient) {}

  public getTranslation(lang: String): Observable<any> {
    return this.http.get(environment.api_url + '/i18n/' + lang).pipe(map(
      (res: any) => {
        return res;
      }
    ));

  }
}

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    NavbarComponent,
    CoverComponent,
    MyworkComponent,
    ContactComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: ServerApiLoader,
        deps: [HttpClient]
    }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
