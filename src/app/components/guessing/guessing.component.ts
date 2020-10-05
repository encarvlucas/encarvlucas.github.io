import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import movieData from './movies.json';
import { Guess } from '../../models/guess.model';
import { GameState } from '../../models/game-state.model';
import { GuessTypes } from 'src/app/models/guess-types.enum';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { StringComparePipe } from 'src/app/pipes/string-compare.pipe';
import { MatTabGroup } from '@angular/material/tabs';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from '../../settings.service';
import { Subscription } from 'rxjs';

const baseTranslate = 'PROJECTS.PROJECT.EMOJI.';

@Component({
  selector: 'app-guessing',
  templateUrl: './guessing.component.html',
  styleUrls: ['./guessing.component.scss']
})
export class GuessingComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatTabGroup)
  matTabGroup: MatTabGroup;
  subscriptions: Subscription[] = [];

  public guessTypes = [
    {
      id: GuessTypes.Movies,
      icon: 'movie_filter',
      title: baseTranslate + 'GENRES.MOVIES',
      ready: true,
    },
    {
      id: GuessTypes.Series,
      icon: 'tv',
      title: baseTranslate + 'GENRES.SERIES',
      ready: false,
    },
    {
      id: GuessTypes.Games,
      icon: 'videogame_asset', // 'casino' as alternative
      title: baseTranslate + 'GENRES.GAMES',
      ready: false,
    },
    {
      id: GuessTypes.Cities,
      icon: 'map', // 'domain' as alternative
      title: baseTranslate + 'GENRES.CITIES',
      ready: false,
    },
    {
      id: GuessTypes.Bands,
      icon: 'theaters',
      title: baseTranslate + 'GENRES.BANDS',
      ready: false,
    },
  ];
  private totalLives = 3;
  public lives: number;
  public guess: Guess;
  public answer: string;
  public history: string[];
  public points: number;
  public highscore: number;
  public movies: Guess[];
  public animationTrigger = {
    active: false,
    correct: true
  };

  constructor(
    private snackBar: MatSnackBar,
    private compare: StringComparePipe,
    private translate: TranslateService,
    private settings: SettingsService,
  ) {
    this.subscriptions.push(
      this.translate.onLangChange.subscribe(() => {
        this.setTabTitles();
      })
    );
  }

  ngOnInit(): void {
    // Initialize game state
    this.movies = movieData;
    this.resetGame(false);
    this.loadState();
    if (this.translate.getLangs) {
      this.setTabTitles();
    }
  }

  ngAfterViewInit() {
    // Fix selected tag width bug
    setTimeout(() => {
      this.matTabGroup.realignInkBar();
    }, 100);
  }

  setTabTitles() {
    this.guessTypes.forEach(
      genre => {
        genre.title = this.translate.instant(genre.title);
      }
    );
  }

  public get remaining(): Guess[] {
    return this.movies.filter(guess => !this.history.includes(guess.id));
  }

  public get livesArray(): boolean[] {
    try {
      return Array(this.lives).fill(true);
    } catch {
      this.resetGame();
      return this.livesArray;
    }
  }

  public submit(attempt: string, guess: Guess): void {
    if (this.compare.transform(attempt, guess)) {
      this.triggerAnimation(true);
      this.points++;
      this.highscore++;
    } else {
      this.alertUser(this.translate.instant(baseTranslate + 'WRONG'));
      this.lives--;
      if (this.lives === 0) {
        this.highscore = 0;
        this.alertUser(
          this.translate.instant(baseTranslate + 'OUT_OF_LIVES', { answer: guess.answers.last() }),
          5000, true
        );
      } else {
        this.triggerAnimation(false);
        this.saveState();
        return;
      }
    }

    this.history.push(this.guess.id);
    this.nextGuess();
  }

  public skip(): void {
    this.highscore = 0;
    this.nextGuess();
  }

  private randomize(options: Guess[]): Guess {
    return options[Math.floor(Math.random() * Math.floor(options.length))];
  }

  public nextGuess(save: boolean = true): void {
    this.lives = this.totalLives;
    this.answer = '';
    // Choose a new guess, besides the current/last
    this.guess = this.randomize(this.remaining.filter(item => item.id !== this.guess?.id));
    if (save) {
      this.saveState();
    }
  }

  private alertUser(message: string, duration: number = 2000, top: boolean = false): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, 'Ok', {
      duration,
      verticalPosition: top ? 'top' : 'bottom',
      horizontalPosition: 'center',
      panelClass: ['snack-bar', 'warn']
    });
  }

  public resetGame(save: boolean = true): void {
    this.history = [];
    this.points = 0;
    this.highscore = 0;

    this.nextGuess(save);
  }

  private saveState(): void {
    const gameState: GameState = {
      points: this.points,
      history: this.history,
      guess: this.guess?.id,
      highscore: this.highscore,
      lives: this.lives,
    };
    this.settings.setGameState(JSON.stringify(gameState));
  }

  private loadState(): void {
    const previousData: GameState = JSON.parse(this.settings.getGameState());
    if (previousData) {
      this.points = previousData.points;
      this.history = previousData.history;
      this.guess = this.movies.filter(guess => guess.id === previousData.guess).first();
      this.highscore = previousData.highscore;
      this.lives = previousData.lives;
    }
  }

  private triggerAnimation(correct: boolean) {
    this.animationTrigger.active = true;
    this.animationTrigger.correct = correct;
    setTimeout(() => {
      this.animationTrigger.active = false;
    }, 400);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(
      subscription => subscription.unsubscribe()
    );
  }
}
