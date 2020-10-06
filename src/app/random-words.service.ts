import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RandomWordsService {

  constructor(
    private httpClient: HttpClient,
    private translate: TranslateService,
  ) { }

  public getRandomWords(qnt = 10, swear = false): Observable<string[]> {
    return this.httpClient.get<string[]>('https://random-word-api.herokuapp.com/word' +
      this.buildUrlQuery({ number: qnt.toString(), swear: swear ? '1' : '0' }));
  }

  public getRandomWiki(): Observable<any> {
    return this.httpClient.get(`https://${this.translate.currentLang}.wikipedia.org/api/rest_v1/page/random/summary`);
  }

  private buildUrlQuery(params: { [key: string]: string }): string {
    const keys = Object.keys(params).filter(key => params[key]);
    let query = '';
    for (const key of keys) {
      query += `${(query ? '&' : '?') + key}=${params[key]}`;
    }
    return query;
  }
}
