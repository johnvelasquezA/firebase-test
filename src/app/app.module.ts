import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import en from '@angular/common/locales/en';
import { AuthComponent } from './auth/auth.component';
import { Routes, RouterModule } from '@angular/router';
import { CountComponent } from './count/count.component';
import { AuthGuard } from './auth.guard';
registerLocaleData(en);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'count', pathMatch: 'full'
  },
  {
    path: 'count', component: CountComponent, canActivate: [AuthGuard]
  },
  {
    path: 'auth', component: AuthComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    CountComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    NzGridModule,
    NzButtonModule,
    NzStatisticModule,
    NzIconModule,
    NzLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
