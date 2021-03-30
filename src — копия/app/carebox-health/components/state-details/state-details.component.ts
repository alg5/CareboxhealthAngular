import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { MAX_WIDTH_MOBILE, StateModel } from '../../models';

@Component({
  selector: 'app-state-details',
  templateUrl: './state-details.component.html',
  styleUrls: ['./state-details.component.css'],
  animations: [
    trigger('notesExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display:'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class StateDetailsComponent implements OnInit {

  // @Input() stateInfo :StateModel;
  private _stateInfo: StateModel;
    
  @Input() set stateInfo(value: StateModel) {
  
     this._stateInfo = value;
     if (value)
     {
      //  if (value.twitter)
        this.twitterLink = value.twitter ? `https://twitter.com/${value.twitter?.replace('@', '')}` : '' ;
        this.historicalDataLink = `https://covidtracking.com/data/state/${value.name.toLowerCase().split(' ').join('-')}/cases` ;   
        this.currentDataLink = `https://covidtracking.com/data/state/${value.name.toLowerCase().split(' ').join('-')}` ;   
       
     }
  
  }
  
  get stateInfo(): StateModel {
  
      return this._stateInfo;
  
  }

  isMobile:boolean;
  showNotes:boolean;
  isMobileOld:boolean;
  twitterLink:string;
  historicalDataLink:string;
  currentDataLink:string;
  translations = {
    DateForText : "Data for   "
    , Cases: " Cases"
    , Tests: "Tests" 
    , Negative: "Negative" 
    , Pending: "Pending" 
    , Hospitalized: "Hospitalized"    
    , Currently: "Currently"  
    , Cumulative: "Cumulative"         
    , InCPU: "In CPU"  
    , OnVentilator: "On Ventilator"  
    , Outcomes: "Outcomes"
    , Recovered: "Recovered"
    , Death: "Death"
    , TotalTestResults: "Total Test Results"
    , PositiveNegative: "Positive + Negative"     
    // , ErrorMessageRequares: "This field is mandatory"
    // , ErrorMessageRowsMax: `Number of rows must be less or equal ${this.maxRows}`
  }
  constructor() { }

  ngOnInit(): void {
    this.isMobile = this.isMobileOld = window.innerWidth <= MAX_WIDTH_MOBILE;
    // console.log("ngOnInit", this.stateInfo, this.twitterLink);
   
  }
  // gethistoricalDataFragment(item:StateModel){
  //   let res = item.name.split(' ').join('-')
  //   // const arr = 
  // }
  // ngAfterViewInit()
  // {
  //   console.log("ngAfterViewInit", this.stateInfo, this.twitterLink);
  // }
  onResize(event) {
    this.isMobile = event.target.innerWidth <= MAX_WIDTH_MOBILE;
    console.log("onResize:isMobile", this.isMobile);
    if (this.isMobile != this.isMobileOld){
      this.isMobileOld = this.isMobile;
      // this.cardsInRow = !this.isMobile ? 4 : 1;
      // this.filteredData();
    }
  }

}
