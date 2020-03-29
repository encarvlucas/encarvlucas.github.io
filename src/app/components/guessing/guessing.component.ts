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
    public lives: boolean[];
    public guess: Guess;
    public answer: string;
    public history: string[];
    public streak: boolean;
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

    public submit(attempt: string, guess: Guess): void {
        if (this.compare.transform(attempt, guess)) {
            this.points++;
            this.nextGuess();
        } else {
            this.lives.pop();
            if (this.lives.length === 0) {
                this.alertUser(`Acabaram suas chances!\nA resposta era \"${guess.answers.last()}\"`,
                    5000, true);
                this.nextGuess();
            } else {
                this.alertUser("Resposta errada");
            }
        }
        this.saveState(
            {
                points: this.points,
                history: this.history,
                highscore: this.highscore,
                lives: this.lives,
                streak: this.streak,
            }
        );
    }

    private randomize(): number {
        const maxNum = this.remaining.length;
        return Math.floor(Math.random() * Math.floor(maxNum));
    }

    private nextGuess(): void {
        this.lives = Array(this.totalLives).fill(true);
        this.answer = "";
        if (this.guess) {
            this.history.push(this.guess.id);
        }
        this.guess = this.remaining[this.randomize()];
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
        this.lives = Array(this.totalLives).fill(true);
        this.history = [];
        this.points = 0;
        this.highscore = 0;
        this.streak = true;

        this.nextGuess();
    }

    // TODO: Add comeback logic
    private saveState(gameState: GameState): void {
        localStorage.setItem("gameState", JSON.stringify(gameState));
    }

    private loadState(): void {
        JSON.parse(localStorage.getItem("gameState"));
    }
}
