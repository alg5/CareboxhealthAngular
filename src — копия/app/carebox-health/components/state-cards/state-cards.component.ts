import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CareboxHealthService } from '../../carebox-health.service';
import { MAX_WIDTH_MOBILE, StateModel } from '../../models';

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
  statesLst: StateModel[];
  statesLstFiltered: StateModel[]; 
  translations = {
    DateByText : "Data by State "
    , Cases: " Cases*"
    , TotalCases: " Total cases"
    , NewCases: "New cases today" 
    , Nowhospitalized: "Now hospitalized"   
    

    , NoDataMessage : "No data by this conditions"

    
    , Tests: "Tests" 
    , Negative: "Negative" 
    , Pending: "Pending" 
    , Hospitalized: "Hospitalized*"    
    , Currently: "Currently" 
    , Outcomes: "Outcomes"
    , Recovered: "Recovered"
    , Death: "Death"
    , TotalTestResults: "Total Test Results"
    , PositiveNegative: "Positive + Negative" 
    , Choose: "Choose the state"    
    // , ErrorMessageRequares: "This field is mandatory"
    // , ErrorMessageRowsMax: `Number of rows must be less or equal ${this.maxRows}`
  }
  // panelOpenState = false;

  //*****************cards*******
  isDropDown: boolean = false;
  selectedItem: string = "";
  itemsInRow: number;
  itemWidth: number;
  
  arrCards = [[],[]];
  containerWidth: number;
  containerItemWith: number;
  cardsInRow: number;

  @ViewChild("container") container: ElementRef;
  @ViewChild("containerItem") containerItem: ElementRef;
  @ViewChild("cardItem") cardItem: ElementRef;
  expandedElement: StateModel | null;
   //*****************end cards*******

  constructor(private careboxHealthService :CareboxHealthService) { }

  ngOnInit(): void {
    this.isMobile = this.isMobileOld = window.innerWidth <= MAX_WIDTH_MOBILE;
    console.log("ngOnInit:isMobile", this.isMobile);
    this.cardsInRow = !this.isMobile ? 4 : 1;
    this.expandedElement = null;
    this.getStatesInfo();

  }
  getStatesInfo(){
    this.careboxHealthService.getStatesAllInfo( )
      .subscribe(
              data => {
                // console.log("getStatesInfo", data)
                  if(!data) {
                    //TODO
                    return;
                  }
                  this.statesLst = data;
                  this.statesLstFiltered = data;
                  console.log("getStatesInfo:1", this.statesLst);
                  // console.log("getStatesInfo:2", this.summary.states);
                  // this.filteredData();
               },
              error => {
                //TODO
    });
  }

  // setContanerCards()
  // {
  //   let num: number = this.statesLst.length / this.itemsInRow;
  //   let rowsCount = Number.isInteger(num) ? num : parseInt(num.toString()) + 1;
  // }
  oldItem: number = 0;
  oldRow: string = "0";
  toggleDropDownItem($event, item){
    let row;
    let lastRow;
    console.log("screen resolution: ", window.screen.availWidth);
    
    this.containerWidth = this.container.nativeElement.offsetWidth;
    this.itemWidth = this.containerWidth;
    this.containerItemWith = this.containerItem.nativeElement.offsetWidth;
    this.itemsInRow = this.containerWidth / this.containerItemWith;
    
    let num: number = item.value / this.itemsInRow;
    row = Number.isInteger(num) ? num : parseInt(num.toString()) + 1;
    
    // lastRow = Number.isInteger(this.statesLst.length / this.itemsInRow) ? this.statesLst.length / this.itemsInRow : parseInt((this.arrItems.length / this.itemsInRow).toString()) + 1;
    lastRow = 10;
    if(row == lastRow){
      row = "last";
    }
    
    console.log("item: ", item.value);
    console.log("row: ", row);

    this.selectedItem = item.value;

    if(this.oldRow == row.toString()){
      if(this.oldItem == item){
        this.isDropDown = !this.isDropDown;
        document.getElementById("'row_" + row + "'").style.display = this.isDropDown ? "block" : "none";
      }else{
        if(!this.isDropDown){
          this.isDropDown = !this.isDropDown;
          document.getElementById("'row_" + row + "'").style.display = this.isDropDown ? "block" : "none";
        }
      }
      this.oldItem = item;
      return;
    }

    if(this.oldRow && this.oldRow != "0" && this.oldRow != row.toString()){
      document.getElementById("'row_" + this.oldRow + "'").style.display = "none";
      if(this.isDropDown){
        this.isDropDown = !this.isDropDown;
      }
      
    }
    
    this.isDropDown = !this.isDropDown;

    document.getElementById("'row_" + row + "'").style.display = this.isDropDown ? "block" : "none";
    
    this.oldRow = row;
    this.oldItem = item;
  }
  onExpanded(item:StateModel, index:number)
  {
    // console.log ("onExpanded", item, this.expandedElement);
    const id = `card-details-${ Math.floor((index) / this.cardsInRow) + 1}`;
    console.log ("onExpanded:1:index =" + index + "; id = " +  id);
    console.log(document.getElementById(id));
    if(this.expandedElement){
      // this.httpService.subjectPaperDetails.next(new SubjectPaperDetails(id, shape));
      const arr = document.querySelectorAll('[id^="card-details"]');
      for (let i=0; i < arr.length; i++){
        arr[i].setAttribute("style", "display:none");
      }
    //   document.querySelectorAll('[id^="card-details"]').forEach(element=> 
    //     element.style.display = "none";
    // });
     
      document.getElementById(id).style.display = "block";
    }
    else{
      // this.paperDetails = null;
      // this.paperDetailsError = 0;
      document.getElementById(id).style.display = "none";
    }
  }
  onStateChange($event){
    console.log("onStateChange", event);
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

}

// checkTimeEt: "03/04 22:59"
// commercialScore: 0
// covid19Site: "http://dhss.alaska.gov/dph/Epi/id/Pages/COVID-19/monitoring.aspx"
// covid19SiteOld: "http://dhss.alaska.gov/dph/Epi/id/Pages/COVID-19/default.aspx"
// covid19SiteQuaternary: "https://services1.arcgis.com/WzFsmainVTuD5KML/arcgis/rest/services/Tests_Dataset/FeatureServer/0/query?where=Test_Result+%3D+%27Negative%27&outStatistics=%5B%7B%27statisticType%27%3A+%27count%27%2C+%27onStatisticField%27%3A+%27FID%27%2C+%27outStatisticFieldName%27%3A+%27tests_negative%27%7D%5D"
// covid19SiteQuinary: "https://services1.arcgis.com/WzFsmainVTuD5KML/arcgis/rest/services/Tests_Dataset/FeatureServer/0/query?where=Test_Result+%3D+%27Positive%27&outStatistics=%5B%7B%27statisticType%27%3A+%27count%27%2C+%27onStatisticField%27%3A+%27FID%27%2C+%27outStatisticFieldName%27%3A+%27tests_positive%27%7D%5D"
// covid19SiteSecondary: "https://experience.arcgis.com/experience/ed1c874ca60b4c15ab09095a070065ca"
// covid19SiteTertiary: "https://alaska-dhss.maps.arcgis.com/apps/opsdashboard/index.html#/8782a14ef52342e99f866a3b8a3e624a"
// covidTrackingProjectPreferredTotalTestField: "totalTestsViral"
// covidTrackingProjectPreferredTotalTestUnits: "Specimens"
// dataQualityGrade: null
// date: 20210307
// dateChecked: "2021-03-05T03:59:00Z"
// dateModified: "2021-03-05T03:59:00Z"
// death: 305
// deathConfirmed: null
// deathIncrease: 0
// deathProbable: null
// fips: "02"
// grade: ""
// hash: "dc4bccd4bb885349d7e94d6fed058e285d4be164"
// hospitalized: 1293
// hospitalizedCumulative: 1293
// hospitalizedCurrently: 33
// hospitalizedDischarged: null
// hospitalizedIncrease: 0
// inIcuCumulative: null
// inIcuCurrently: null
// lastUpdateEt: "3/5/2021 03:59"
// name: "Alaska"
// negative: null
// negativeIncrease: 0
// negativeRegularScore: 0
// negativeScore: 0
// negativeTestsAntibody: null
// negativeTestsPeopleAntibody: null
// negativeTestsViral: 1660758
// notes: "Alaska combines PCR and antigen tests in the total tests figure reported on the state's dashboard.↵↵As of February 6, 2021, [Alaska no longer updates](https://twitter.com/alaska_dhss/status/1355349178335944708?s=21) their COVID-19 dashboards on weekends. As a result, we will be unable to update their data on Saturdays and Sundays. ↵↵On February 12, 2021, Alaska [announced](https://twitter.com/Alaska_DHSS/status/1360413364065767424?s=20) via the official Alaska Department of Health and Social Services twitter that there would be no update to their data on February 15, 2021 due to the Presidents Day holiday.↵↵On January 20, 2021, Alaska [reported](https://www.adn.com/alaska-news/2021/01/20/tracking-covid-19-in-alaska-record-23-deaths-and-167-infections-reported-wednesday/) a comparatively large increase of 23 deaths due to a review of death certificates.↵↵On January 4, 2020, Alaska noted that "counted deaths in Alaska include COVID-19 cases confirmed through a lab result as well as probable deaths based on confirmed COVID-19 clinical and epidemiological criteria as defined by the CDC with no confirmatory lab testing." Due to this change we are unable to update the **Confirmed deaths** metric after January 4, 2020.↵↵On January 1, 2021, Alaska noted that there would be no update to their data on January 1, 2021.↵↵On December 25, 2020, Alaska announced on their dashboard that there would be no update to their data on December 25, 2020. ↵↵On November 17, 2020, Alaska [announced](https://alaska-coronavirus-vaccine-outreach-alaska-dhss.hub.arcgis.com/datasets/cases-frequently-asked-questions) that “As of 11/17/2020, the cases dashboard will not be showing data on recovered and active cases due to the increasing State case load”. Due to this we cannot continue reporting **Recovered**, however the time series for this metric is available in the historical data, and our data downloads. ↵↵On November 16, 2020 we updated the **Cases (confirmed plus probable)** field to include only residents. We also deleted the time series for **Confirmed cases** because Alaska is lumping PCR and antigen testing for their case definition.↵↵On November 16, 2020 we added **Cumulative Hospitalized** (which includes both residents and non-residents), although the value does not reflect current hospitalizations.↵↵On November 7, 2020, Alaska announced that their testing dashboard would be "temporarily disabled from November 6th to November 9th" and that testing data could be accessed through their data summary tables. After originally using the data summary tables on November 7, we have reversed that decision, and reverted the values to their November 6th state. The frozen values were replaced on November 10, with values from the state's [Tests Dataset](https://coronavirus-response-alaska-dhss.hub.arcgis.com/datasets/tests-dataset). ↵↵On November 6, 2020, Alaska’s **Total PCR tests (specimens)** and **Positive PCR tests (specimens)** decreased without explanation. As a result, `Negative`, which is calculated by subtracting **Total cases** from **Total PCR tests (specimens)**, decreased also.↵↵On November 5, 2020, Alaska’s **Total PCR tests (specimens)** increased from roughly 628k to 782k. We were unable to find an explanation for the increase.↵↵As of September 18, 2020, Alaska's total test results are drawn from our `totalTestsViral` field instead of calculated via positive+negative."
// onVentilatorCumulative: null
// onVentilatorCurrently: 2
// pending: null
// posNeg: 56886
// positive: 56886
// positiveCasesViral: null
// positiveIncrease: 0
// positiveScore: 0
// positiveTestsAntibody: null
// positiveTestsAntigen: null
// positiveTestsPeopleAntibody: null
// positiveTestsPeopleAntigen: null
// positiveTestsViral: 68693
// probableCases: null
// pui: "All data"
// pum: false
// recovered: null
// score: 0
// state: "AK"
// total: 56886
// totalTestEncountersViral: null
// totalTestResults: 1731628
// totalTestResultsField: "Total Tests (PCR)"
// totalTestResultsIncrease: 0
// totalTestResultsSource: "totalTestsViral"
// totalTestsAntibody: null
// totalTestsAntigen: null
// totalTestsPeopleAntibody: null
// totalTestsPeopleAntigen: null
// totalTestsPeopleViral: null
// totalTestsViral: 1731628
