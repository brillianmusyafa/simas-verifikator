import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform, MenuController, Events } from 'ionic-angular';

import { DashboardPage } from '../pages/dashboard/dashboard';
import { SettingsPage } from '../pages/settings/settings';
import { LoginPage } from '../pages/login/login';
import { DataLokalProvider } from '../providers/data-lokal/data-lokal';
import { Storage } from '@ionic/storage';


@Component({
  template: `<ion-menu [content]="content">
  <ion-header>
  <ion-toolbar color="secondary">
  <ion-list class="brand">
  <ion-item>
  <ion-avatar item-start>
  <img src="assets/img/pic.png">
  </ion-avatar>
  <h2>{{user.name}}</h2>
  <p>{{user.kecamatan}}</p>
  <p>{{user.kelurahan}}</p>
  </ion-item>
  </ion-list>

  </ion-toolbar>
  </ion-header>

  <ion-content>
  <ion-list>
  <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
  {{p.title}}
  </button>
  <button menuClose ion-item (click)="logout()">
  Logout
  </button>
  </ion-list>
  </ion-content>

  </ion-menu>
  <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  public rootPage:any;
  @ViewChild(Nav) nav: Nav;
  pages: any[] = [
  {title: 'Setting', component: SettingsPage}
  ];

  public user: any = {
    name: '',
    kecamatan_id:'',
    kecamatan: '',
    kelurahan_id:'',
    kelurahan: '',
    role:''
  };

  constructor(private translate: TranslateService, 
    platform: Platform,
    private config: Config, 
    private statusBar: StatusBar, 
    private splashScreen: SplashScreen,
    public storage: Storage,
    public menu: MenuController,
    public events: Events,
    private datalokal: DataLokalProvider) {
    this.statusBar.hide();

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // this.statusBar.styleDefault();
      // let status bar overlay webview
      this.statusBar.overlaysWebView(false);

      // set status bar to white
      this.statusBar.backgroundColorByHexString('#000051');

      this.storage.get('userlogin').then((res)=>{
        if(res){
          this.user.name = res.auth.name;
          this.user = {
            name: res.auth.name,
            kecamatan: res.user.kecamatan.kec_name,
            kelurahan: res.user.kelurahan.kel_name,
            kecamatan_id: res.user.kecamatan.id,
            kelurahan_id: res.user.kelurahan.id
          };
          this.rootPage = DashboardPage;
          this.menu.enable(true);
        }
        else{
          this.rootPage = LoginPage;
        }
      });

      // events login
      this.events.subscribe('user:created',(data,time)=>{
        this.user.name = data.auth.name;
        this.user = {
          name: data.auth.name,
          kecamatan: data.user.kecamatan.kec_name,
          kelurahan: data.user.kelurahan.kel_name,
          kecamatan_id: data.user.kecamatan.id,
          kelurahan_id: data.user.kelurahan.id
        };

      });
    });
    this.initTranslate();
    this.splashScreen.hide();
    this.statusBar.show();
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }

  logout(){
    this.datalokal.clearData();
    this.nav.setRoot(LoginPage);
  }
}
