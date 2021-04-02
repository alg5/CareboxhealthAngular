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