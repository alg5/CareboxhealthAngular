import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { CareboxHealthService } from '../../carebox-health.service';
import { MAX_WIDTH_MOBILE,  StateModel } from '../../models';
import { ViewportScroller } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

export interface StateGroup {
  letter: string;
  names: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-state-cards',
  templateUrl: './state-cards.component.html',
  styleUrls: ['./state-cards.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display:'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class StateCardsComponent implements OnInit {

  isMobile:boolean;
  isMobileOld:boolean;
  isSticky: boolean = false;
  statesLst: StateModel[];
  statesLstFiltered: StateModel[]; 
  
  translations = {
    DateByText : "Data by State "
    , Cases: " Cases*"
    , TotalCases: " Total cases"
    , NewCases: "New cases today" 
    , Nowhospitalized: "Now hospitalized" 
    , Choose: "Choose the state" 
   }
 
  //*****************cards*******
  // isDropDown: boolean = false;
  // selectedItem: string = "";
  // itemsInRow: number;
  // itemWidth: number;
  
  // arrCards = [[],[]];
  // containerWidth: number;
  // containerItemWith: number;

cardsInRow: number;
  // #region autocomplete
  stateForm: FormGroup;
  stateGroups: StateGroup[];
  stateNames: string[];
  filterOptionsControl = new FormControl();
  stateGroupOptions: Observable<StateGroup[]>;
  // filteredOptions: Observable<string[]>;
  //#endregion

  expandedElement: StateModel | null;
   //*****************end cards*******

  constructor(private careboxHealthService :CareboxHealthService
            , private viewportScroller: ViewportScroller
            , private activatedRoute: ActivatedRoute
            , private _formBuilder: FormBuilder
            ) { }

  ngOnInit(): void {
    this.stateForm = this._formBuilder.group({
      stateGroup: '',
    });
    this.isMobile = this.isMobileOld = window.innerWidth <= MAX_WIDTH_MOBILE;
    console.log("ngOnInit:isMobile", this.isMobile);
    this.cardsInRow = !this.isMobile ? 4 : 1;
    this.expandedElement = null;
    this.getStatesInfo();
    this.stateGroupOptions = this.stateForm.get('stateGroup')!.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterGroup(value))
    );

  }
  private _filterGroup(value: string): StateGroup[] {
    if (value) {
      return this.stateGroups
        .map(group => ({letter: group.letter, names: _filter(group.names, value)}))
        .filter(group => group.names.length > 0);
    }

    return this.stateGroups;
  }
  getStatesInfo(){
    this.careboxHealthService.getStatesAllInfo( )
      .subscribe(
              data => {
                  if(!data) {
                    //TODO
                    return;
                  }
                  this.statesLst = data;
                  //TODO
                  this.statesLstFiltered = data;
                  this.fillStateNamesAndGroups();
                  console.log(this.stateGroups, this.stateNames);
                  // this.filteredData();
               },
              error => {
                //TODO
    });
  }

  onExpanded(item:StateModel, index:number)
  {
    const id = `card-details-${ Math.floor((index) / this.cardsInRow) + 1}`;
    if(this.expandedElement){
      const arr = document.querySelectorAll('[id^="card-details"]');
      for (let i=0; i < arr.length; i++){
        arr[i].setAttribute("style", "display:none");
      }
      document.getElementById(id).style.display = "block";
    }
    else{
       document.getElementById(id).style.display = "none";
    }
  }
  onStateChange($event){
    // console.log("onStateChange", $event.value);
    console.log(document.querySelector(`#${$event.value}`));
    //  document.querySelector(`#${$event.value}`).scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
     const element : HTMLElement =  document.querySelector(`#${$event.value}`);
     console.log(element);
    //  element.scrollIntoView();
      // window.scrollTo(0, 500);
      const anchor = `${$event.value}`;
      const index = parseInt(element.getAttribute("data-index")) ;
      console.log("index", index, element.dataset.index);
      const state:StateModel = this.statesLst.filter(item=>item.state == anchor)[0];
      if (state)
      {
        this.expandedElement = state;
        this. onExpanded(state, index);
      }
    this.viewportScroller.scrollToAnchor(anchor);
    // this.activatedRoute.navigate(['/', ); = "KY";
  }
  onStateSelected(stateName:string)
  {
    console.log("onStateSelected",stateName );
    const state:StateModel = this.statesLst.filter(item=>item.name == stateName)[0];
    if (state){
      const anchorCard = state.state;
      const element : HTMLElement =  document.querySelector(`#${anchorCard}`);
      console.log(element);
      const index = parseInt(element.getAttribute("data-index")) ;
      console.log("index", index, element.dataset.index);
      this.expandedElement = state;
      this. onExpanded(state, index);
      this.viewportScroller.scrollToAnchor(anchorCard);
    }
  
  }
  // onclickAnchor(idState:string, index:number){
  //   const state:StateModel = this.statesLst.filter(item=>item.state == idState)[0];
  //   if (state)
  //   {
  //     this.expandedElement = state;
  //     this. onExpanded(state, index);
  //   }
  // }: StateGroup[]

  fillStateNamesAndGroups(){
   this.stateNames  = [];
   this.stateGroups  = [];
    let names:string[] = [];
    let stateGroup:StateGroup = {letter: "", names : names};
    let firstLetterPrev = '';
    for (let i = 0; i < this.statesLst.length; i++){
      let item:StateModel = this.statesLst[i];

      this.stateNames.push(item.name);
      
      let firstLetter:string = item.name.substring(0, 1);
      if (firstLetter != firstLetterPrev){
        firstLetterPrev = firstLetter;
        names = [];
        names.push(item.name);
        stateGroup  = {letter:firstLetter, names:names };
        this.stateGroups.push (stateGroup);
      }
      else{
        stateGroup.names.push(item.name);
      }
    }
  }
  onResize(event) {
    this.isMobile = event.target.innerWidth <= MAX_WIDTH_MOBILE;
    console.log("onResize:isMobile", this.isMobile);
    if (this.isMobile != this.isMobileOld){
      this.isMobileOld = this.isMobile;
      this.cardsInRow = !this.isMobile ? 4 : 1;
      // this.filteredData();
    }
  }
  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.pageYOffset >= 250;
  }
  backtoTop(){
    console.log("backtoTop");
    if(this.expandedElement)
    {
      this.expandedElement = null;
    }
  }
  // closeAllCards(){
  //   if(this.expandedElement){
  //     const arr = document.querySelectorAll('[id^="card-details"]');
  //     for (let i=0; i < arr.length; i++){
  //       arr[i].setAttribute("style", "display:none");
  //     }
      
  //   }
  // }

}
