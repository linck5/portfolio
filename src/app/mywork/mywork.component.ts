import { Component, OnInit, NgModule } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core'
import { MyworkPipe } from './mywork.pipe'
import { HttpService } from 'src/app/globalServices/http-service/http.service'


interface Work {
  title:string;
  imageUrl?:string;
  description:string;
  type:string;
  workUrl?:string;
  videoUrl?:string;
  sourceCodeUrl?:string;
}

@Component({
  selector: 'app-mywork',
  templateUrl: './mywork.component.html',
  styleUrls: ['./mywork.component.scss']
})
export class MyworkComponent implements OnInit {



  worksData:any;


  works:Work[] = [
    {
      title: "Gerador de Citações",
      imageUrl: 'assets/images/quoteGeneratorThumbnail.png',
      description: 'Página que randomiza citações famosas cada vez que o usuário clica no botão. Utilizando uma <a href="https://market.mashape.com/andruxnet/random-famous-quotes">API de citações</a> e a API do twitter para twittar a citação.',
      type: 'web',
      workUrl: 'assets/works/quoteGenerator/index.html',
      sourceCodeUrl: 'http://codepen.io/linck5/pen/qRpoxo'
    },
    {
      title: "Clima Local",
      imageUrl: 'assets/images/localWeatherThumbnail.png',
      description: 'Esta página utiliza uma <a href="https://openweathermap.org/current">API de clima</a> e <a href="https://freegeoip.net">outra de geolocalização</a> para mostrar ao usuário como está o clima no seu local. A versão para visualizar possui ícones ilustrativos com uma linguagem visual mais condizente do que a versão do código fonte.',
      type: 'web',
      workUrl: 'assets/works/localWeather/index.html',
      sourceCodeUrl: 'http://codepen.io/linck5/pen/QdrYPQ'
    },
    {
      title: "Este site",
      description: 'Estou aprendendo muito fazendo este portfólio. Utilizo várias APIs, como Bootstrap para a barra de navegação e os blocos nesta seção, <a href="https://michalsnik.github.io/aos/">AoS</a> para animações, <a href="http://fontawesome.io/">Font Awesome</a> para alguns ícones e google maps para o mapa em baixo. Para o estilo utilizo SCSS e bibliotecas como <a href="http://include-media.com/">Include Media</a> para media queries mais padronizadas. A responsividade também está bem boa até onde pude testar.',
      type: 'web',
      sourceCodeUrl: 'https://github.com/linck5/portfolio_website'
    },
    {
      title: "Barris",
      imageUrl: 'assets/images/barrelsGameThumbnail.png',
      description: 'Protótipo de jogo inspirado em certas partes dos jogos da série <a href="https://pt.wikipedia.org/wiki/Donkey_Kong">Donkey Kong</a>, onde o personagem deve pular de barril em barril. Feito com <a href="https://unity3d.com/pt">Unity</a>. Dificuldade aumenta progressivamente. Posição e movimentos dos barris são gerados proceduralmente.',
      type: 'gamedev',
      videoUrl: 'https://youtu.be/p8L5-tTSrJI',
      sourceCodeUrl: 'https://github.com/linck5/barrels_game'
    },
    {
      title: "Tower Defense",
      imageUrl: 'assets/images/towerDefenseGameThumbnail.png',
      description: 'Este protótipo feito em flash é uma demonstração de torres com ataque em área inteligentes em um <a href="https://pt.wikipedia.org/wiki/Tower_defense">tower defense</a>. Antes de atirar, as torres sempre calculam o ponto onde a área irá atingir mais inimigos simultâneamente, tirando máximo proveito de cada tiro.',
      type: 'gamedev',
      workUrl: 'assets/works/towerDefense/index.html',
      videoUrl: 'https://youtu.be/SKwGC-QuiYU',
      sourceCodeUrl: 'https://github.com/linck5/smart_Aoe_TD'
    }
  ]

  isFirstOnLangChangeEvent = true;

  workType:string = "all";

  private onLangChange(event: LangChangeEvent) {

    if(!this.isFirstOnLangChangeEvent){
      this.updateWorks(event.lang)
    }

    this.isFirstOnLangChangeEvent = false;
  }

  private updateWorks(lang){
    console.log(lang)

    this.works = []

    const i18nProps = ["title", "imageUrl", "description", "type", "workUrl", "sourceCodeUrl"]
    const otherProps = ["type", "date", ]

    for (let work of this.worksData) {
        let newWork:any = {}
        for (let prop of i18nProps) {
          if(lang == "en"){
            if(work[prop]){
              console.log("here")
              newWork[prop] = work[prop]
            }
          }
          else{
            if(work.i18n && work.i18n[lang] && work.i18n[lang][prop]){
              newWork[prop] = work.i18n[lang][prop]
            }
            else if(work[prop]){
              newWork[prop] = work[prop]
            }
          }
        }
        for (let prop of otherProps) {
          newWork[prop] = work[prop]
        }
        this.works.push(newWork)
    }
  }

  constructor(public translate: TranslateService, public httpService:HttpService) { }

  async ngOnInit() {
    console.log(this.isFirstOnLangChangeEvent)
    this.translate.onLangChange.subscribe(this.onLangChange.bind(this))
    console.log(this.works[2].sourceCodeUrl)

    this.worksData = await this.httpService.get("/projects").toPromise()

    this.updateWorks("en")
  }

}
