import { Component, OnInit } from '@angular/core';
import { TextAnimatorService } from '../globalServices/textAnimator/text-animator.service'

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private textAnimator:TextAnimatorService) { }

  text1: string = `Sempre gostei de tecnologia e começei a me envolver com desenvolvimento. Meu gosto por jogos me fez estudar esta área, e trabalhei como desenvolvedor de jogos em algumas empresas. Agora estou interessado e buscando conhecimento em desenvolvimento web. Estive estudando várias tecnologias, tanto de front quanto de back end. Tenho bastante vontade de adquirir mais experiência e trabalhar em equipe.`

  ngOnInit() {
    this.textAnimator.animateText(
      this.text1, document.getElementById('p1'), {})
  }

}
