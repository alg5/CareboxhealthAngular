import { Component, Input, OnInit } from '@angular/core';
import { TotalWorldChartModel } from '../../models';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-total-world-char',
  templateUrl: './total-world-char.component.html',
  styleUrls: ['./total-world-char.component.css']
})
export class TotalWorldCharComponent implements OnInit {

  private _totalWorldCharData : TotalWorldChartModel[] ;
  @Input() set totalWorldCharData(value: TotalWorldChartModel[]) {
 
    this._totalWorldCharData = value;
    if (value)
    {
       this.fillChartValues();
    }
 }
 
 get totalWorldCharData(): TotalWorldChartModel[] {
 
     return this._totalWorldCharData;
 
 }

 fillChartValues()
 {
    this.barChartData = [];
    for (const [key, value] of Object.entries(this.totalWorldCharData)) {
 
      const arr: number[] = [parseInt(value.toString().replace(",", "")) ];
      let item =  { data: [parseInt(value.toString().replace(",", ""))], label: key };
      this.barChartData.push(item);
    }
    // console.log("this.barChartData1", this.barChartData1);

 }

 public barChartOptions: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  // We use these empty structures as placeholders for dynamic theming.
  scales: { xAxes: [{}], yAxes: [{}] },
  plugins: {
    datalabels: {
      anchor: 'end',
      align: 'end',
    }
  }
};
public barChartLabels: Label[] = ['2021'];  
public barChartType: ChartType = 'bar';//todo
public barChartLegend = true;
public barChartPlugins = [pluginDataLabels];

public barChartData: ChartDataSets[] = [];


  constructor() { }

  ngOnInit(): void {
  }
  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  // public randomize(): void {
  //   // Only Change 3 values
  //   this.barChartData1[0].data = [
  //     Math.round(Math.random() * 100),
  //     59,
  //     80,
  //     (Math.random() * 100),
  //     56,
  //     (Math.random() * 100),
  //     40 ];
  // }

}
