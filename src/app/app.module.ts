import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { Items } from '../mocks/providers/items';
import { Settings } from '../providers/providers';
import { User } from '../providers/providers';
import { Api } from '../providers/providers';
import { MyApp } from './app.component';
import { SettingsPageModule } from '../pages/settings/settings.module';
// import { NavController } from 'ionic-angular';

// page I created
import { DetailVerifikasiPage } from '../pages/detail-verifikasi/detail-verifikasi';
import { ListDataPage } from '../pages/list-data/list-data';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { LoginPageModule } from '../pages/login/login.module';
import { SignupPageModule } from '../pages/signup/signup.module';
import { DataPbdtIdvPageModule } from '../pages/data-pbdt-idv/data-pbdt-idv.module';
import { DataPbdtRtPageModule } from '../pages/data-pbdt-rt/data-pbdt-rt.module';
import { DinsosJknPageModule } from '../pages/dinsos-jkn/dinsos-jkn.module';

// native
import { Geolocation } from '@ionic-native/geolocation';
import { NativeStorage } from '@ionic-native/native-storage';
import { DataLokalProvider } from '../providers/data-lokal/data-lokal';

import { HttpModule } from '@angular/http';
import { DataServerProvider } from '../providers/data-server/data-server';


// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    option1: true,
    option2: 'Ionitron J. Framework',
    option3: '3',
    option4: 'Hello'
  });
}

@NgModule({
  declarations: [
    MyApp,

    // pages
    DetailVerifikasiPage,
    ListDataPage,
    DashboardPage
  ],
  imports: [
    LoginPageModule,
    SignupPageModule,
    BrowserModule,
    HttpClientModule,
    DataPbdtIdvPageModule,
    DataPbdtRtPageModule,
    HttpModule,
    SettingsPageModule,
    DinsosJknPageModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

    // pages
    DetailVerifikasiPage,
    ListDataPage,
    DashboardPage
  ],
  providers: [
    Api,
    Items,
    User,
    Camera,
    SplashScreen,
    StatusBar,
    Geolocation,
    NativeStorage,
    // NavController,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DataLokalProvider,
    DataServerProvider
  ]
})
export class AppModule { }
