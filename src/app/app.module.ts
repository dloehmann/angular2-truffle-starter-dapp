import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './content/app.component';

import { HeaderComponent } from './header/header.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { VerificationComponent } from './verification/verification.component';
import { RfaComponent } from './rfa/rfa.component';
import { NewRfaComponent } from './new-rfa/new-rfa.component';
import {RouterModule} from "@angular/router";
import { MyAccountComponent } from './my-account/my-account.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import * as metaincoinArtifacts from '../../build/contracts/MetaCoin.json';
import * as Web3 from "web3";
import * as contract  from 'truffle-contract';
import { canBeNumber } from '../util/validation';
import { TrufflestarterComponent } from './trufflestarter/trufflestarter.component';

@NgModule({
imports: [
  BrowserModule,
  FormsModule,
  HttpModule,
  InMemoryWebApiModule.forRoot(InMemoryDataService),

  RouterModule.forRoot([
    {
      path: '',
      redirectTo: '/truffleStarter',
      pathMatch: 'full'
    },
    {
      path: 'truffleStarter',
      component: TrufflestarterComponent
    },
    {
      path: 'assignments',
      component: AssignmentComponent
    },
    {
      path: 'rfa',
      component: RfaComponent
    },
    {
      path: 'verification',
      component: VerificationComponent
    },
    {
      path: 'myAccount',
      component: MyAccountComponent
    },
  ])

],
  declarations: [
    AppComponent,
    HeaderComponent,
    AssignmentComponent,
    VerificationComponent,
    RfaComponent,
    NewRfaComponent,
    MyAccountComponent,
    TrufflestarterComponent
  ],
  providers: [],
  bootstrap: [AppComponent, HeaderComponent]
})
export class AppModule { }
