import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddZipComponent } from './add-zip/add-zip.component';
import { ForecastComponent } from './forecast/forecast.component';

const routes: Routes = [
  { path: '', component: AddZipComponent },
  { path: 'forecast/:zip', component: ForecastComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
