export const MAX_WIDTH_MOBILE = 760;
// export interface StateGroup {
//   letter: string;
//   names: string[];
// }
export class SummaryModel
{
    date: number;
    states: number;
    positive: number;
    negative: number;
    pending: number;
    hospitalizedCurrently: number;
    hospitalizedCumulative: number;
    inIcuCurrently: number;
    inIcuCumulative: number;
    onVentilatorCurrently: number;
    onVentilatorCumulative: number;
    dateChecked: Date; //'2021-03-07T24:00:00Z';
    death: number;
    hospitalized: number;
    totalTestResults: 363824818;
    lastModified: Date; // '2021-03-07T24:00:00Z';
    recovered: number;
    total: number;
    posNeg: number;
    deathIncrease: number;
    hospitalizedIncrease: number;
    negativeIncrease: number;
    positiveIncrease: number;
    totalTestResultsIncrease: number;
    hash: string; //'74952fef2e04125e96bbf3007726bc3e64a6a6d8'
  }
  export class StateModel
  {
    checkTimeEt: Date;
    commercialScore: number;
    covid19Site: string;
    covid19SiteOld: string;
    covid19SiteQuaternary: string;
    covid19SiteQuinary: string;
    covid19SiteSecondary: string;
    covid19SiteTertiary: string;
    covidTrackingProjectPreferredTotalTestField: string;
    covidTrackingProjectPreferredTotalTestUnits:string;
    dataQualityGrade: number;
    date: number;
    dateChecked: Date;
    dateModified: Date;
    death: number;
    deathConfirmed: number;
    deathIncrease: number;
    deathProbable: number;
    fips: string;
    grade: string;
    hash: string;
    hospitalized: number;
    hospitalizedCumulative: number;
    hospitalizedCurrently: number;
    hospitalizedDischarged: number;
    hospitalizedIncrease: number;
    inIcuCumulative: number;
    inIcuCurrently: number;
    lastUpdateEt: Date;
    name: string;
    negative: number;
    negativeIncrease: number;
    negativeRegularScore: number;
    negativeScore: number;
    negativeTestsAntibody: number;
    negativeTestsPeopleAntibody: number;
    negativeTestsViral: number;
    notes: string;
    onVentilatorCumulative: number;
    onVentilatorCurrently: number;
    pending: number;
    posNeg: number;
    positive: number;
    positiveCasesViral: number;
    positiveIncrease: number;
    positiveScore: number;
    positiveTestsAntibody: number;
    positiveTestsAntigen: number;
    positiveTestsPeopleAntibody: number;
    positiveTestsPeopleAntigen: number;
    positiveTestsViral: number;
    probableCases: number;
    pum: boolean;
    recovered: number;
    score: number;
    state: string;
    total: number;
    totalTestEncountersViral: number;
    totalTestResults: number;
    totalTestResultsField: string;
    totalTestResultsIncrease: number;
    totalTestResultsSource: string;
    totalTestsAntibody: number;
    totalTestsAntigen: number;
    totalTestsPeopleAntibody: number;
    totalTestsPeopleAntigen: number;
    totalTestsPeopleViral: number;
    totalTestsViral: number;
    twitter: string;
  };
  export class SummaryChartModel
  {
      Confirmed:number;
      Deaths:number;
      Recovered:number;
      Active:number;
      Date:Date;
  }
  export class StateChartModel
  {
      Confirmed:number;
      Deaths:number;
      Recovered:number;
      Active:number;
      Date:Date;
  }
  export class TotalWorldChartModel
  {
    total_cases:number;
    recovery_cases:number;
    death_cases:number;
    currently_infected:number;
    cases_with_outcome:number;    
    mild_condition_active_cases:number; 
    critical_condition_active_cases:number;     
    recovered_closed_cases:number;   
    death_closed_cases:number;  
    last_update:Date;
   }

  //  {"data": {"total_cases": "130,820,485", "recovery_cases": "105,307,385", "death_cases": "2,850,523", "last_update":
  // "Apr, 03 2021, 04:42, UTC", "currently_infected": "22,662,577", 
  // "cases_with_outcome": "108,157,908", "mild_condition_active_cases": "22,564,825", 
  // "critical_condition_active_cases": "97,752", "recovered_closed_cases": "105,307,385", 
  // "death_closed_cases": "2,850,523", 
  // "closed_cases_recovered_percentage": "97.0", 
  // "closed_cases_death_percentage": "3.0",
  //  "active_cases_mild_percentage": "100.0", 
  //  "active_cases_critical_percentage": "0.0", "general_death_rate": "2.0"}, "status": "success"}


 /* date_stamp : Date; // "2020-01-23",
    cnt_confirmed : number;
    cnt_death : number;
    cnt_recovered : number; */
    // {
    //   "Country":"United States of America",
    //   "CountryCode":"","
    //   Province":"",
    //   "City":"",
    //   "CityCode":"",
    //   "Lat":"0","Lon":"0",
    //   "Confirmed":28705881,
    //   "Deaths":515683,
    //   "Recovered":0,
    //   "Active":28148586,
    //   "Date":"2021-03-01T00:00:00Z"
    // }