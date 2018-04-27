import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { UserService } from './_services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './_services/data.service';
import { FilterComponent } from './filter/filter.component';


@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
