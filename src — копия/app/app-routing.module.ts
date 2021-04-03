import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [

 { path: '', pathMatch: 'full', redirectTo: 'careboxhealth' },
 { path: 'careboxhealth', loadChildren: () => import('./carebox-health/carebox-health.module').then(m => m.CareboxHealthModule) },

];

@NgModule({
  imports: [BrowserModule, 
    // RouterModule.forRoot(routes)]
    RouterModule.forRoot(routes,  {
      scrollPositionRestoration: 'enabled', // or 'top'
      anchorScrolling: 'enabled',
      scrollOffset: [0, 64], // [x, y] - adjust scroll offset
      // onSameUrlNavigation: 'reload',
      // useHash: false
    })]
    ,

  exports: [RouterModule]
})
export class AppRoutingModule { }
