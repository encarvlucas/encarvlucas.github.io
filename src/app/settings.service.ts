import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public language: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);
  public gameState: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);

  constructor() { }

  getLanguage(): string {
    if (!this.language.value) {
      this.language.next(this.load('language'));
    }
    return this.language.value;
  }

  setLanguage(lang: string) {
    this.save('language', lang);
    this.language.next(lang);
  }

  getGameState() {
    return this.load('gameState');
  }

  setGameState(state: string) {
    this.save('gameState', state);
  }

  private save(prop: string, value: string) {
    localStorage.setItem(prop, value);
  }

  private load(prop: string): string {
    return localStorage.getItem(prop);
  }
}
