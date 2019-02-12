import { Injectable } from '@angular/core';
import * as possibleDic from './possibleDic.json'

@Injectable({
  providedIn: 'root'
})
export class TextAnimatorService {

  defaultPossible:string
  domElement:any
  targetText:string
  mainLoop:any
  charsPerSolve = 10
  solvingSections = []
  solvingTargets = []
  possibles = []


  constructor() { }

  animateText(targetText: string, domElement, options: object) {

    this.defaultPossible = this.uniqueChars(targetText)
    this.domElement = domElement
    this.targetText = targetText
    this.mainLoop = setInterval(this.generate.bind(this), 50)
    return possibleDic["a"]
  }

  private uniqueChars(str:string){
    let unique=""
    for (let x = 0; x < str.length; x++){
      if( unique.indexOf(str.charAt(x)) == -1 ){
        unique += str[x]
      }
    }
    return unique;
  }

  private addRandomChars(str, amount){
    for(let i = 0; i < amount; i++){
      str += this.randomChar(this.defaultPossible)
    }
    return str
  }

  private randomChar(possible){
    return possible.charAt(Math.floor(Math.random() * possible.length))
  }

  private replaceAt(string, index, replace) {
    return string.substring(0, index) + replace + string.substring(index + 1);
  }

  private determinePossibles(char, target){

    let plainTarget =
        target.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()

    if(possibleDic[plainTarget] != undefined){
      return possibleDic[plainTarget] + target
    }
    else if(!isNaN(plainTarget)){
      let possible = "0123456789".replace(plainTarget, '').repeat(10)
      return possible + target
    }
    else{
      return this.defaultPossible
    }
  }

  private attemptChar(possiblesIndex){
    let char = this.randomChar(this.possibles[possiblesIndex])
    this.possibles[possiblesIndex] =
      this.replaceAt(this.possibles[possiblesIndex], this.possibles[possiblesIndex].indexOf(char), "")

    return char
  }

  private updateDom(){
    let rawText = this.solvingSections.join('')
    let taggedText = ""
    for(let i = 0; i < this.possibles.length; i++){
      if(this.possibles[i] == null){
        //taggedText += '<span>'+rawText[i]+'</span>'
        taggedText += rawText[i]
      }
      else{
        let progress = this.possibles[i].length / this.defaultPossible.length

        taggedText += rawText[i]
      }

    }
    this.domElement.textContent = taggedText
  }

  private generate() {

    let fullText = this.solvingSections.join('')
    let solvedCharsCount = 0

    for(let p of this.possibles){
      if(p == null) solvedCharsCount++
    }

    let unsolvedChars = fullText.length - solvedCharsCount

    if(fullText == this.targetText){
      this.possibles = this.possibles.map( ()=>null )
      this.updateDom()
      clearInterval(this.mainLoop)
      return
    }

    if(Math.floor(Math.random() * Math.ceil(unsolvedChars / 20)) == 0 &&
      this.targetText.length != fullText.length){
      this.solvingSections.push("")
    }


    for(let j = 0; j < this.solvingSections.length; j++){

      if(this.solvingSections[j] == this.solvingTargets[j]){

      }
      else if(this.solvingSections[j] == ""){

        let charsToSolve = this.charsPerSolve
        let remainingGlobalCharsToSolve = this.targetText.length - this.solvingSections.join('').length;

        if(remainingGlobalCharsToSolve < charsToSolve){
          charsToSolve = remainingGlobalCharsToSolve
        }

        this.solvingTargets[j] = this.targetText.substring(fullText.length, fullText.length + charsToSolve)
        this.solvingSections[j] = this.addRandomChars("", charsToSolve)

        for(let i = 0; i < charsToSolve; i++){

          this.possibles.push(
            this.determinePossibles(this.solvingSections[j][i], this.solvingTargets[j][i]))
          let possiblesIndex = this.possibles.length - 1

          let updateChar = function(j, i, possiblesIndex){
            if(this.solvingSections[j][i] != this.solvingTargets[j][i]){

              this.solvingSections[j] =
                this.replaceAt(this.solvingSections[j], i, this.attemptChar(possiblesIndex))

              this.updateDom()

              let delay = 3000/(-1+this.possibles[possiblesIndex].length)
              let minDelay = 50
              let maxDelay = 750

              delay = Math.min(Math.max(delay, minDelay), maxDelay);

              setTimeout(updateChar.bind(this), delay, j, i, possiblesIndex)
            }
            else{
              this.possibles[possiblesIndex] = null
            }
          }

          setTimeout(updateChar.bind(this), 5, j, i, possiblesIndex)
        }
      }
    }
  }

}
