import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CareboxHealthService } from '../../carebox-health.service';
import { SummaryChartModel } from '../../models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isSticky: boolean = false;
  newcasesbystatesUrl: string = ""
  url3 = "https://www.youtube.com";
  safeurl:any;
selectedTabIndex: number = 0;
selectedIndexChange(index: number) {
  console.log("selectedIndexChange", index);
  setTimeout(() => this.selectedTabIndex = index);
  if (index == 1 && !this.summaryChartList){
    this.getSummaryChartData();
  }
}


  summaryChartList : SummaryChartModel[] ;
  constructor(private careboxHealthService :CareboxHealthService
    , private sanitizer: DomSanitizer
    ) { }

  ngOnInit(): void {
    this.safeurl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url3);
  }

  getSummaryChartData(){
    this.careboxHealthService.getSummaryChartData( )
      .subscribe(
              data => {
                // console.log("getSummaryData", data)
                  if(!data) {
                    //TODO
                    return;
                  }
                  
                  this.summaryChartList = data;
                  
                  // console.log("getSummaryData:2", this.summary.states);
                  // this.filteredData();
               },
              error => {
                //TODO
    });
  }
  
  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.pageYOffset >= 250;
  }

}
