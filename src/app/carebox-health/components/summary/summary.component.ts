import { Component, OnInit } from '@angular/core';
import { MAX_WIDTH_MOBILE, SummaryModel } from '../../models';
import { CareboxHealthService } from '../../carebox-health.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  summary : SummaryModel;
  dataSource: MatTableDataSource<SummaryModel>;
  isMobile:boolean;
  isMobileOld:boolean;
  translations = {
    DateForText : "Data for   "
    , Cases: " Cases*"
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
    // , ErrorMessageRequares: "This field is mandatory"
    // , ErrorMessageRowsMax: `Number of rows must be less or equal ${this.maxRows}`
  }
  displayedColumns: string[] = ['positive', 'name'];
  constructor(private careboxHealthService :CareboxHealthService) { }

  ngOnInit(): void {
    this.isMobile = this.isMobileOld = window.innerWidth <= MAX_WIDTH_MOBILE;
    console.log("ngOnInit:isMobile", this.isMobile);
    this.getSummaryData();
  }
  getSummaryData(){
    this.careboxHealthService.getSummaryData( )
      .subscribe(
              data => {
                // console.log("getSummaryData", data)
                  if(!data) {
                    //TODO
                    return;
                  }
                  this.summary = data;
                  this.dataSource = new MatTableDataSource(data);
                  
                  // console.log("getSummaryData:1", this.datasource);
                  // console.log("getSummaryData:2", this.summary.states);
                  // this.filteredData();
               },
              error => {
                //TODO
    });
  }
  onResize(event) {
    this.isMobile = event.target.innerWidth <= MAX_WIDTH_MOBILE;
    console.log("onResize:isMobile", this.isMobile);
    if (this.isMobile != this.isMobileOld){
      this.isMobileOld = this.isMobile;
      // this.filteredData();
    }
  }
}
// {
//   date: 20210307,
//   states: 56,
//   positive: 28756184,
//   negative: 74582825,
//   pending: 11808,
//   hospitalizedCurrently: 40212,
//   hospitalizedCumulative: 878613,
//   inIcuCurrently: 8137,
//   inIcuCumulative: 45475,
//   onVentilatorCurrently: 2801,
//   onVentilatorCumulative: 4281,
//   dateChecked: '2021-03-07T24:00:00Z',
//   death: 515148,
//   hospitalized: 878613,
//   totalTestResults: 363824818,
//   lastModified: '2021-03-07T24:00:00Z',
//   recovered: null,
//   total: 0,
//   posNeg: 0,
//   deathIncrease: 839,
//   hospitalizedIncrease: 726,
//   negativeIncrease: 131835,
//   positiveIncrease: 41530,
//   totalTestResultsIncrease: 1169754,
//   hash: '74952fef2e04125e96bbf3007726bc3e64a6a6d8'
// }
// {
//   "state":"AK",
//   "notes":"Alaska combines PCR and antigen tests in the total tests figure reported on the state's dashboard.\n\nAs of February 6, 2021, [Alaska no longer updates](https://twitter.com/alaska_dhss/status/1355349178335944708?s=21) their COVID-19 dashboards on weekends. As a result, we will be unable to update their data on Saturdays and Sundays. \n\nOn February 12, 2021, Alaska [announced](https://twitter.com/Alaska_DHSS/status/1360413364065767424?s=20) via the official Alaska Department of Health and Social Services twitter that there would be no update to their data on February 15, 2021 due to the Presidents Day holiday.\n\nOn January 20, 2021, Alaska [reported](https://www.adn.com/alaska-news/2021/01/20/tracking-covid-19-in-alaska-record-23-deaths-and-167-infections-reported-wednesday/) a comparatively large increase of 23 deaths due to a review of death certificates.\n\nOn January 4, 2020, Alaska noted that \"counted deaths in Alaska include COVID-19 cases confirmed through a lab result as well as probable deaths based on confirmed COVID-19 clinical and epidemiological criteria as defined by the CDC with no confirmatory lab testing.\" Due to this change we are unable to update the **Confirmed deaths** metric after January 4, 2020.\n\nOn January 1, 2021, Alaska noted that there would be no update to their data on January 1, 2021.\n\nOn December 25, 2020, Alaska announced on their dashboard that there would be no update to their data on December 25, 2020. \n\nOn November 17, 2020, Alaska [announced](https://alaska-coronavirus-vaccine-outreach-alaska-dhss.hub.arcgis.com/datasets/cases-frequently-asked-questions) that “As of 11/17/2020, the cases dashboard will not be showing data on recovered and active cases due to the increasing State case load”. Due to this we cannot continue reporting **Recovered**, however the time series for this metric is available in the historical data, and our data downloads. \n\nOn November 16, 2020 we updated the **Cases (confirmed plus probable)** field to include only residents. We also deleted the time series for **Confirmed cases** because Alaska is lumping PCR and antigen testing for their case definition.\n\nOn November 16, 2020 we added **Cumulative Hospitalized** (which includes both residents and non-residents), although the value does not reflect current hospitalizations.\n\nOn November 7, 2020, Alaska announced that their testing dashboard would be \"temporarily disabled from November 6th to November 9th\" and that testing data could be accessed through their data summary tables. After originally using the data summary tables on November 7, we have reversed that decision, and reverted the values to their November 6th state. The frozen values were replaced on November 10, with values from the state's [Tests Dataset](https://coronavirus-response-alaska-dhss.hub.arcgis.com/datasets/tests-dataset). \n\nOn November 6, 2020, Alaska’s **Total PCR tests (specimens)** and **Positive PCR tests (specimens)** decreased without explanation. As a result, `Negative`, which is calculated by subtracting **Total cases** from **Total PCR tests (specimens)**, decreased also.\n\nOn November 5, 2020, Alaska’s **Total PCR tests (specimens)** increased from roughly 628k to 782k. We were unable to find an explanation for the increase.\n\nAs of September 18, 2020, Alaska's total test results are drawn from our `totalTestsViral` field instead of calculated via positive+negative.",
//   "covid19Site":"http://dhss.alaska.gov/dph/Epi/id/Pages/COVID-19/monitoring.aspx",
//   "covid19SiteSecondary":"https://experience.arcgis.com/experience/ed1c874ca60b4c15ab09095a070065ca",
//   "covid19SiteTertiary":"https://alaska-dhss.maps.arcgis.com/apps/opsdashboard/index.html#/8782a14ef52342e99f866a3b8a3e624a",
//   "covid19SiteQuaternary":"https://services1.arcgis.com/WzFsmainVTuD5KML/arcgis/rest/services/Tests_Dataset/FeatureServer/0/query?where=Test_Result+%3D+%27Negative%27&outStatistics=%5B%7B%27statisticType%27%3A+%27count%27%2C+%27onStatisticField%27%3A+%27FID%27%2C+%27outStatisticFieldName%27%3A+%27tests_negative%27%7D%5D",
//   "covid19SiteQuinary":"https://services1.arcgis.com/WzFsmainVTuD5KML/arcgis/rest/services/Tests_Dataset/FeatureServer/0/query?where=Test_Result+%3D+%27Positive%27&outStatistics=%5B%7B%27statisticType%27%3A+%27count%27%2C+%27onStatisticField%27%3A+%27FID%27%2C+%27outStatisticFieldName%27%3A+%27tests_positive%27%7D%5D",
//   "twitter":"@Alaska_DHSS",
//   "covid19SiteOld":"http://dhss.alaska.gov/dph/Epi/id/Pages/COVID-19/default.aspx",
//   "covidTrackingProjectPreferredTotalTestUnits":"Specimens",
//   "covidTrackingProjectPreferredTotalTestField":"totalTestsViral",
//   "totalTestResultsField":"Total Tests (PCR)",
//   "pui":"All data",
//   "pum":false,
//   "name":"Alaska",
//   "fips":"02"
// },
