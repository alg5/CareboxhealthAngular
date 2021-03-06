import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StateModel } from './models';

@Injectable({
  providedIn: 'root'
})
export class CareboxHealthService {

  constructor(private http: HttpClient) { 

  }

  
  getSummaryData( ): Observable<any>  {
     const res = `${ environment.apiUrl}summary`;
    //  console.log("res", res);
     return this.http.get(res).pipe(map(data => {
      const obj = {'summary': data[0]};
      // console.log(data);
      return  data[0];
      
    }),
      catchError(err => {
        console.log("err: ", err);
        return throwError(err);
      }))
  };

 getStatesAllInfo( ): Observable<any>  {
  const statesInfoUrl = `${ environment.apiUrl}statesinfo`;
  const statesCurrentUrl = `${ environment.apiUrl}statescurrent`;
  const statesInfoRequest = this.http.get(statesInfoUrl) ;
  const  statesCurrentRequest = this.http.get( statesCurrentUrl) ;
  return forkJoin(
    [
      statesInfoRequest,
      statesCurrentRequest,
    ])
  // .pipe(tap(([res1, res2]) => {
   .pipe(map(res => { 
       let obj1 = res[0];
      // console.log("forkJoin:1", obj1);
      let obj2 = res[1];
      let statesArr : Array<StateModel> =  new Array<StateModel>();
       for (let i=0; i< Object.values(obj1).length; i++){
          let item1 =  Object.values(obj1)[i];
          let item2 =  Object.values(obj2)[i];
         
          let obj =  Object.assign(item1, item2); 
          // console.log("forkJoin:5", obj);
          statesArr.push(obj);
       }
      return statesArr;

    }),

   catchError(err => {
     console.log("err: ", err);
     return throwError(err);
   }))
};

getSummaryChartData( ): Observable<any>  {
  const res = `${ environment.apiUrl}summarychart`;
   return this.http.get(res).pipe(map(data => {
   return  data;
   
 }),
   catchError(err => {
     console.log("err: ", err);
     return throwError(err);
   }))
};

getAllCharsData( ): Observable<any>  {
  const summarychartUrl = `${ environment.apiUrl}summarychart`;
  const totalworldchartUrl = `${ environment.apiUrl}totalworldchart`;
  const summarychartRequest = this.http.get(summarychartUrl) ;
  const  totalworldchartRequest = this.http.get( totalworldchartUrl) ;
  return forkJoin(
    [
      summarychartRequest,
      totalworldchartRequest,
    ])
  // .pipe(tap(([res1, res2]) => {
   .pipe(map(res => { 
       let obj1 = res[0];
      const resData = {summary: res[0], totalworld: res[1]["data"] };
      return resData;

    }),

   catchError(err => {
     console.log("err: ", err);
     return throwError(err);
   }))
};
}


