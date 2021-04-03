import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { CareboxHealthRoutingModule } from './carebox-health-routing.module';
// import { CareboxHealthComponent } from './carebox-health.component';
import { SummaryComponent } from './components/summary/summary.component';
import { StateCardsComponent } from './components/state-cards/state-cards.component';
import { HomeComponent } from './components/home/home.component';
import { StateDetailsComponent } from './components/state-details/state-details.component';
import { NullableNumberPipe } from './pipes/nullable-number.pipe';
import { NotesStylePipe } from './pipes/notes-style.pipe';
import { MaterialModule } from '../shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SummaryChartLineComponent } from './components/summary-chart-line/summary-chart-line.component';
import { ChartsModule } from 'ng2-charts';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { ChartTestComponent } from './components/chart-test/chart-test.component';
import { StateChartBarComponent } from './components/state-chart-bar/state-chart-bar.component';
import { TotalWorldCharComponent } from './components/total-world-char/total-world-char.component';

@NgModule({
  declarations: [ SummaryComponent, StateCardsComponent, HomeComponent, StateDetailsComponent
                  , NullableNumberPipe, NotesStylePipe, SafeUrlPipe
                  , SummaryChartLineComponent, ChartTestComponent, StateChartBarComponent, TotalWorldCharComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    CareboxHealthRoutingModule,
    ChartsModule

    
  ],
  providers: [DecimalPipe],
})
export class CareboxHealthModule { }
