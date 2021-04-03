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

@NgModule({
  declarations: [ SummaryComponent, StateCardsComponent, HomeComponent, StateDetailsComponent
                  , NullableNumberPipe, NotesStylePipe],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    CareboxHealthRoutingModule,
    
  ],
  providers: [DecimalPipe],
})
export class CareboxHealthModule { }
