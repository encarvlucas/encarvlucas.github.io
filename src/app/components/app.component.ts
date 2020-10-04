import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public languagues = ['en', 'pt'];
  constructor(
    private translate: TranslateService
  ) {
    translate.addLangs(this.languagues);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(this.languagues.includes(browserLang) ? browserLang : translate.getDefaultLang());
  }
  title = 'encarvlucas-site';
}
