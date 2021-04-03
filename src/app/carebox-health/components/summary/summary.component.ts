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
  }
  displayedColumns: string[] = ['positive', 'negative', 'pending', 'hospitalizedCurrently', 'recovered', 'death', 'states'];
  constructor(private careboxHealthService :CareboxHealthService) { }

  ngOnInit(): void {
    this.isMobile = this.isMobileOld = window.innerWidth <= MAX_WIDTH_MOBILE;
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
                  const arr = new Array<SummaryModel>();
                  arr.push(this.summary);
                  this.dataSource = new MatTableDataSource(arr);
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

