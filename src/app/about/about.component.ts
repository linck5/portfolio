import { Component, OnInit } from '@angular/core'
import { TextAnimatorService } from '../globalServices/textAnimator/text-animator.service'
import { TranslateService, LangChangeEvent } from '@ngx-translate/core'

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(
    private textAnimator:TextAnimatorService,
    private translate: TranslateService) { }


  elementIsSomewhatVisible(element) {
    let threshold = 200 //pixels
    let elementTop = element.getBoundingClientRect().top
    return elementTop + threshold < window.innerHeight
  }

  ngOnInit() {




    let aboutTextElement = document.getElementById('about-text')

    aboutTextElement.style.visibility = "hidden"

    this.translate.onLangChange.subscribe((lang: LangChangeEvent) => {
      let animateWhenVisible = setInterval(function(){
        if(this.elementIsSomewhatVisible(aboutTextElement)){
          this.textAnimator.animateText(lang.translations['About']['MainParagraph'], aboutTextElement)

          //this delay is a workaround so that the text doesn't flicker on the screen at the start
          //this is due to the fact that the innerHTML starts as the full text, and only then after
          //some delay it gets transformed into the first few characters
          setTimeout(()=>aboutTextElement.style.visibility = "visible", 51)

          clearInterval(animateWhenVisible)
        }
      }.bind(this), 200)
    });

  }




}
