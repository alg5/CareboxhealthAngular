import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
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

  private _stateInfo: StateModel;
   @Input() set stateInfo(value: StateModel) {
  
     this._stateInfo = value;
     if (value)
     {
        this.twitterLink = value.twitter ? `https://twitter.com/${value.twitter?.replace('@', '')}` : '' ;
        this.historicalDataLink = `https://covidtracking.com/data/state/${value.name.toLowerCase().split(' ').join('-')}/cases` ;   
        this.currentDataLink = `https://covidtracking.com/data/state/${value.name.toLowerCase().split(' ').join('-')}` ;   
        const arr = new Array<StateModel>();
        arr.push(value);
        this.dataSource = new MatTableDataSource(arr);
       
     }
  
  }
  
  get stateInfo(): StateModel {
  
      return this._stateInfo;
  
  }
  @Output() backToTopEvent = new EventEmitter<null>();
  dataSource: MatTableDataSource<StateModel>;
  displayedColumns: string[] = 
      [
        'positive'
        , 'negative'
        , 'pending'
        , 'hospitalizedCurrently'
        , 'hospitalizedCumulative'
        , 'inIcuCurrently'
        , 'inIcuCumulative'
        , 'onVentilatorCurrently'    
        , 'onVentilatorCumulative'     
        , 'recovered'
        , 'death'   
        , 'states'       
      ];
  isMobile:boolean;
  showNotes:boolean = true;
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
  }
  constructor() { }

  ngOnInit(): void {
    this.isMobile = this.isMobileOld = window.innerWidth <= MAX_WIDTH_MOBILE;
  
  }

  onResize(event) {
    this.isMobile = event.target.innerWidth <= MAX_WIDTH_MOBILE;
    console.log("onResize:isMobile", this.isMobile);
    if (this.isMobile != this.isMobileOld){
      this.isMobileOld = this.isMobile;
    }
  }
  backToTop()
  {
    this.backToTopEvent.emit();
    window.scrollTo(0, 0);
  }

}
