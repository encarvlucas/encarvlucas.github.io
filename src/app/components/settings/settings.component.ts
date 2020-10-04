import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { SettingsService } from '../../settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  public languages = [
    { code: 'en', title: 'EN-US' },
    { code: 'pt', title: 'PT-BR' },
  ];

  private subscriptions: Subscription[] = [];

  constructor(
    private translate: TranslateService,
    private settings: SettingsService,
  ) {
    this.subscriptions.push(
      this.settings.language.subscribe(lang => translate.use(lang))
    );
  }

  ngOnInit(): void {
  }

  changeLang(lang: string) {
    this.settings.setLanguage(lang);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(
      subscription => subscription.unsubscribe()
    );
  }
}
