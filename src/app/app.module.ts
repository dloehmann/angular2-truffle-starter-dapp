import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { VerificationComponent } from './verification/verification.component';
import { RfaComponent } from './rfa/rfa.component';
import { NewRfaComponent } from './new-rfa/new-rfa.component';
import {RouterModule} from "@angular/router";
import { MyAccountComponent } from './my-account/my-account.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { Web3 }  from 'web3';
import { contract } from 'truffle-contract';


@NgModule({
imports: [
  BrowserModule,
  FormsModule,
  HttpModule,
  InMemoryWebApiModule.forRoot(InMemoryDataService),

  RouterModule.forRoot([
    {
      path: '',
      redirectTo: '/assignments',
      pathMatch: 'full'
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
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent, HeaderComponent]
})
export class AppModule { }
