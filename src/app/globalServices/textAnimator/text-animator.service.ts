import { Injectable } from '@angular/core';
import possibleDic from './possibleDic'

interface AnimationOptions{
  charsPerSection?: number
  sectionGenerationDelay?: number
  numberGenerationSlowness?: number
  chanceToAddNewGeneration?: number
  newCharDelayScale?: number
  newCharDelayMin?: number
  newCharDelayMax?: number
  possibleRepeatAmount?: number
  charPossibilitiesSize?: number
  ignoreSpace?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class TextAnimatorService {

  defaultPossible:string
  domElement:any
  targetText:string
  mainLoop:any
  solvingSections:string[]
  solvingTargets:string[]
  possibles:any[]
  updateCharTimeouts:object = {}
  timeoutCount:number
  opt:AnimationOptions


  constructor() { }


  animateText(targetText: string, domElement, options: object = {}) {

    Object.keys(this.updateCharTimeouts).forEach((key)=>{
      clearTimeout(this.updateCharTimeouts[key])
    })
    if(this.mainLoop){
        clearInterval(this.mainLoop)
    }

    this.updateCharTimeouts = {}
    this.timeoutCount = 0
    this.solvingSections = []
    this.solvingTargets = []
    this.possibles = []


    this.opt = {
      charsPerSection: 3,
      sectionGenerationDelay: 20,
      numberGenerationSlowness: 2,
      chanceToAddNewGeneration: 80,
      newCharDelayScale: 3000,
      newCharDelayMin: 50,
      newCharDelayMax: 750,
      possibleRepeatAmount: 2,
      charPossibilitiesSize: 8,
      ignoreSpace: true
    }
    Object.assign(this.opt, options)

    this.defaultPossible = this.uniqueChars(targetText)
    this.domElement = domElement
    this.targetText = targetText
    this.mainLoop = setInterval(
      this.generate.bind(this), this.opt.sectionGenerationDelay)
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

    if(this.opt.ignoreSpace && plainTarget == " "){
      return " "
    }
    if(possibleDic[plainTarget] != undefined){

      let possible = possibleDic[plainTarget].repeat(this.opt.possibleRepeatAmount)
      let charsToAdd = this.opt.charPossibilitiesSize - possible.length

      for (let _ = 0; _ < charsToAdd; _++) {
          let randomIndex =
            Math.floor(Math.random() * this.defaultPossible.length)
          possible += this.defaultPossible[randomIndex]
      }

      return possible + target
    }
    else if(!isNaN(plainTarget)){
      let possible = "0123456789".replace(plainTarget, '')
        .repeat(this.opt.numberGenerationSlowness)

      return possible + target
    }
    else{
      return this.defaultPossible
    }
  }

  private attemptChar(possiblesIndex){
    let char = this.randomChar(this.possibles[possiblesIndex])
    this.possibles[possiblesIndex] = this.replaceAt(
      this.possibles[possiblesIndex],
      this.possibles[possiblesIndex].indexOf(char),
      "")

    return char
  }

  private updateDom(){
    let rawText = this.solvingSections.join('')
    this.domElement.textContent = rawText
  }

  private generate() {

    let fullText = this.solvingSections.join('')
    let solvedCharsCount = 0

    for(let p of this.possibles){
      if(p.done) solvedCharsCount++
    }

    let unsolvedChars = fullText.length - solvedCharsCount

    if(fullText == this.targetText){
      this.possibles = this.possibles.map( ()=>null )
      this.updateDom()
      clearInterval(this.mainLoop)
      return
    }

    if( Math.floor(Math.random() *
        Math.ceil(unsolvedChars / this.opt.chanceToAddNewGeneration)) == 0 &&
        this.targetText.length != fullText.length){
      this.solvingSections.push("")
    }


    for(let j = 0; j < this.solvingSections.length; j++){

      if(this.solvingSections[j] == ""){

        let charsToSolve = this.opt.charsPerSection
        let remainingGlobalCharsToSolve =
          this.targetText.length - this.solvingSections.join('').length;

        if(remainingGlobalCharsToSolve < charsToSolve){
          charsToSolve = remainingGlobalCharsToSolve
        }

              this.solvingTargets[j] = this.targetText.substring(
          fullText.length, fullText.length + charsToSolve)
        this.solvingSections[j] = this.addRandomChars("", charsToSolve)

        for(let i = 0; i < charsToSolve; i++){

          this.possibles.push(
            this.determinePossibles(
              this.solvingSections[j][i],
              this.solvingTargets[j][i]))
          let possiblesIndex = this.possibles.length - 1

          this.updateCharTimeouts[this.timeoutCount.toString()] =
            setTimeout(this.updateChar.bind(this), 5, j, i, possiblesIndex, this.timeoutCount++)
        }
      }
    }
  }

  updateChar(j, i, possiblesIndex, timeoutIndex){
    if(this.solvingSections[j][i] != this.solvingTargets[j][i]){

      this.solvingSections[j] = this.replaceAt(
        this.solvingSections[j],
        i,
        this.attemptChar(possiblesIndex))

      this.updateDom()

      let delay =
        this.opt.newCharDelayScale /
        (-1+this.possibles[possiblesIndex].length)

      delay = Math.min(Math.max(
        delay, this.opt.newCharDelayMin), this.opt.newCharDelayMax);

      this.clearCharTimeout(timeoutIndex)

      this.updateCharTimeouts[this.timeoutCount.toString()] =
        setTimeout(this.updateChar.bind(this), delay, j, i, possiblesIndex, this.timeoutCount++)
    }
    else{
      this.clearCharTimeout(timeoutIndex)

      this.possibles[possiblesIndex] = {done:true, params:[j,i,possiblesIndex]}
    }
  }

  clearCharTimeout(timeoutIndex){
    clearTimeout(this.updateCharTimeouts[timeoutIndex])
    delete this.updateCharTimeouts[timeoutIndex]
  }

}
