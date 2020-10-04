import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  languages = [
    { code: 'en', title: 'EN-US' },
    { code: 'pt', title: 'PT-BR' },
  ];

  constructor(
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
  }

  changeLang(lang: string) {
    this.translate.use(lang);
  }
}
