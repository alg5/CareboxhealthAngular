import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { SummaryChartModel } from '../../models';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-summary-chart-line',
  templateUrl: './summary-chart-line.component.html',
  styleUrls: ['./summary-chart-line.component.css']
})
export class SummaryChartLineComponent implements OnInit {

  private _summaryChartList : SummaryChartModel[] ;
   @Input() set summaryChartList(value: SummaryChartModel[]) {
  
     this._summaryChartList = value;
     if (value)
     {
 
        this.fillChartValues();
        
       
     }
  
  }
  
  get summaryChartList(): SummaryChartModel[] {
  
      return this._summaryChartList;
  
  }

  fillChartValues()
  {
    const confirmedList = this.summaryChartList.map(x=>x.Confirmed);
    const recoveredList = this.summaryChartList.map(x=>x.Recovered);
    const deathsList = this.summaryChartList.map(x=>x.Deaths);
    const activesList = this.summaryChartList.map(x=>x.Active);  

    console.log("deathsList", deathsList);
    this.lineChartLabels = this.summaryChartList.map(x=> this.datePipe.transform(x.Date, 'dd/MM')); 
    this.lineChartData =[
        {data:activesList, label: 'Active', yAxisID: 'y-axis-0' },
      {data:confirmedList, label: 'Confirmed', yAxisID: 'y-axis-1' },
      {data:recoveredList, label: 'Recovered', yAxisID: 'y-axis-2' },      
      {data:deathsList, label: 'Deaths', yAxisID: 'y-axis-3'}
   
    ]
    
    this.chartReady = true;

  }
  getRowColor(index: number):string | string[]{
    return this.lineChartColors[index].backgroundColor;

  }

  
  public lineChartOptions: ChartOptions  = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          type: 'linear',
	        gridLines: {
            color: 'rgba(0,255,0,0.3)',
          },display: true,
	      },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          // ticks: {
          //   fontColor: 'red',
          // }
          type: 'linear',
	        display: true,
        },
        {
          id: 'y-axis-2',
          position: 'left',
          gridLines: {
            color: 'rgba(0,0,255,0.3)',
          },
          type: 'linear',
	        display: true,
	      },
        {
          id: 'y-axis-3',
          position: 'left',
          gridLines: {
            color: 'rgba(0,0,0,0.3)',
          },
          type: 'linear',
	        display: true,
	      },
      ]
    },
  }  
  
  
  public lineChartColors: Color[] = [
    { // green
      backgroundColor: 'rgba(0,255,0,0.3)',
      borderColor: 'green',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    {
       // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    
  ];



  public lineChartData: ChartDataSets[];
  lineChartLabels: Label[];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  // public lineChartPlugins = [pluginAnnotations];
  public lineChartPlugins = [];
  chartReady: boolean;
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;


  constructor(private datePipe: DatePipe) { }

  ngOnInit(): void {

  }
 
  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  public hideOne(): void {
    const isHidden = this.chart.isDatasetHidden(1);
    this.chart.hideDataset(1, !isHidden);
  }

  

  public changeColor(): void {
    this.lineChartColors[2].borderColor = 'green';
    this.lineChartColors[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
  }

  public changeLabel(): void {
    this.lineChartLabels[2] = ['1st Line', '2nd Line'];
  }

}
