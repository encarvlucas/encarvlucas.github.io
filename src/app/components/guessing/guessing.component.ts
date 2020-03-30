import { Component, OnInit } from "@angular/core";
import movieData from "./movies.json";
import { Guess } from "../../models/guess.model";
import { GameState } from "../../models/game-state.model";
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from "@angular/material/snack-bar";
import { StringComparePipe } from "src/app/pipes/string-compare.pipe";
import {  } from "./../../custom-prototypes";

@Component({
    selector: "app-guessing",
    templateUrl: "./guessing.component.html",
    styleUrls: ["./guessing.component.scss"]
})
export class GuessingComponent implements OnInit {

    private totalLives = 3;
    public lives: number;
    public guess: Guess;
    public answer: string;
    public history: string[];
    public points: number;
    public highscore: number;
    public movies: Guess[];

    constructor(
        private snackBar: MatSnackBar,
        private compare: StringComparePipe
    ) { }

    ngOnInit(): void {
        // Initialize game state
        this.movies = movieData;
        this.resetGame();
        this.loadState();
    }

    private get remaining(): Guess[] {
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
            this.points++;
            this.highscore++;
        } else {
            this.lives--;
            if (this.lives === 0) {
                this.highscore = 0;
                this.alertUser(`Acabaram suas chances!\nA resposta era \"${guess.answers.last()}\"`,
                    5000, true);
            } else {
                this.alertUser("Resposta errada");
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

    private randomize(): number {
        const maxNum = this.remaining.length;
        return Math.floor(Math.random() * Math.floor(maxNum));
    }

    public nextGuess(): void {
        this.lives = this.totalLives;
        this.answer = "";
        this.guess = this.remaining[this.randomize()];
        if (this.guess) {
            this.saveState();
        }
    }

    private alertUser(message: string, duration: number = 2000, top: boolean = false): MatSnackBarRef<SimpleSnackBar> {
        return this.snackBar.open(message, "Ok", {
            duration,
            verticalPosition: top ? "top" : "bottom",
            horizontalPosition: "right",
            panelClass: ["snack-bar", "warn"]
        });
    }

    public resetGame(): void {
        this.history = [];
        this.points = 0;
        this.highscore = 0;

        this.nextGuess();
    }

    private saveState(): void {
        const gameState: GameState = {
            points: this.points,
            history: this.history,
            guess: this.guess.id,
            highscore: this.highscore,
            lives: this.lives,
        };
        localStorage.setItem("gameState", JSON.stringify(gameState));
    }

    private loadState(): void {
        const previousData: GameState = JSON.parse(localStorage.getItem("gameState"));
        if (previousData) {
            this.points = previousData.points;
            this.history = previousData.history;
            this.guess = this.movies.filter(guess => guess.id === previousData.guess).first();
            this.highscore = previousData.highscore;
            this.lives = previousData.lives;
        }
    }
}
