import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
// import {  } from './../../custom-prototypes';
import movieData from './movies.json';
import { Guess } from '../../models/guess.model';
import { GameState } from '../../models/game-state.model';
import { GuessTypes } from 'src/app/models/guess-types.enum';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { StringComparePipe } from 'src/app/pipes/string-compare.pipe';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
    selector: 'app-guessing',
    templateUrl: './guessing.component.html',
    styleUrls: ['./guessing.component.scss']
})
export class GuessingComponent implements OnInit, AfterViewInit {
    @ViewChild(MatTabGroup)
    matTabGroup: MatTabGroup;

    public guessTypes = [
        {
            id: GuessTypes.Movies,
            icon: 'movie_filter',
            title: 'Filmes',
            ready: true,
        },
        {
            id: GuessTypes.Series,
            icon: 'tv',
            title: 'Séries',
            ready: false,
        },
        {
            id: GuessTypes.Games,
            icon: 'videogame_asset', // 'casino' as alternative
            title: 'Jogos',
            ready: false,
        },
        {
            id: GuessTypes.Cities,
            icon: 'map', // 'domain' as alternative
            title: 'Cidades',
            ready: false,
        },
        {
            id: GuessTypes.Bands,
            icon: 'theaters',
            title: 'Bandas',
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
        private compare: StringComparePipe
    ) { }

    ngOnInit(): void {
        // Initialize game state
        this.movies = movieData;
        this.resetGame(false);
        this.loadState();
    }

    ngAfterViewInit() {
        // Fix selected tag width bug
        setTimeout(() => {
            this.matTabGroup.realignInkBar();
        }, 100);
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
            this.alertUser('Resposta errada');
            this.lives--;
            if (this.lives === 0) {
                this.highscore = 0;
                this.alertUser(`Acabaram suas chances!\nA resposta era \'${guess.answers.last()}\'`,
                    5000, true);
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
            horizontalPosition: 'right',
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
        localStorage.setItem('gameState', JSON.stringify(gameState));
    }

    private loadState(): void {
        const previousData: GameState = JSON.parse(localStorage.getItem('gameState'));
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
}
