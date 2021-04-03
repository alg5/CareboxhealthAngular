import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CareboxHealthService } from '../../carebox-health.service';
import { SummaryChartModel, TotalWorldChartModel } from '../../models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isSticky: boolean = false;
  
selectedTabIndex: number = 0;
selectedIndexChange(index: number) {
  setTimeout(() => this.selectedTabIndex = index);
  //TODO
  if (index == 1 && !this.totalWorldCharData){
  //  if (index == 1 ){  
    this.getAllCharsData();
  }
}

selectedIndexInnerChange(index: number) {
  // console.log("selectedIndexInnerChange", index);
}


  summaryChartList : SummaryChartModel[] ;
  totalWorldCharData:TotalWorldChartModel;

  constructor(private careboxHealthService :CareboxHealthService
    , private sanitizer: DomSanitizer
    ) { }

  ngOnInit(): void {
    // this.safeurl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url3);
  }
 
  getAllCharsData(){
    this.careboxHealthService.getAllCharsData( )
      .subscribe(
              data => {
                  if(!data) {
                    //TODO
                    return;
                  }
                  
                  this.summaryChartList = data.summary;
                  this.totalWorldCharData = data.totalworld;

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
