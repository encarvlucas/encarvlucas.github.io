import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public languagues = ['en', 'pt'];
  title = 'encarvlucas-site';
  constructor(
    private translate: TranslateService,
    private settings: SettingsService,
  ) {
    this.handleLanguage();
  }

  handleLanguage() {
    this.translate.addLangs(this.languagues);
    this.translate.setDefaultLang('en');

    // Get user cached language || use user's browser language as default
    const userLang = this.settings.getLanguage() || this.translate.getBrowserLang();
    this.settings.setLanguage(this.languagues.includes(userLang) ? userLang : this.translate.getDefaultLang());
    this.translate.use(this.settings.language.value);
  }
}
