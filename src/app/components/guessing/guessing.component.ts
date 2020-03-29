import { Component, OnInit } from "@angular/core";
import movieData from "./movies.json";
import { Guess } from "./guess.model";
import { GameState } from "./game-state.model";
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from "@angular/material/snack-bar";

@Component({
    selector: "app-guessing",
    templateUrl: "./guessing.component.html",
    styleUrls: ["./guessing.component.scss"]
})
export class GuessingComponent implements OnInit {

    private totalLives = 3;
    public lives: boolean[];
    private currentIndex: number;
    public answer: string;
    public streak: boolean;
    public points: number;
    public highscore: number;
    public movies: Guess[];

    constructor(
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        // Initialize game state
        this.lives = Array(this.totalLives).fill(true);
        this.points = 0;
        this.highscore = 0;
        this.streak = true;
        this.loadState();

        // Shuffle list
        this.movies = movieData;
        // TODO: Shuffling...
        this.currentIndex = 0;
    }

    public get guess(): Guess {
        return this.movies[this.currentIndex];
    }

    public submit(attempt: string, guess: Guess): void {
        if (attempt === guess.name) {
            this.points++;
            this.nextGuess();
        } else {
            this.lives.pop();
            if (this.lives.length === 0) {
                this.alertUser(`Acabaram suas chances!\nA resposta era \"${guess.name}\"`,
                    5000, true);
                this.nextGuess();
            } else {
                this.alertUser("Resposta errada");
            }
        }
        this.saveState(
            {
                points: this.points,
                currentIndex: this.currentIndex,
                highscore: this.highscore,
                lives: this.lives,
                streak: this.streak,
            }
        );
    }

    // TODO: Change next guess function to randomly choose next guess and treat no more guesses
    private nextGuess(): void {
        this.lives = Array(this.totalLives).fill(true);
        this.answer = "";
        this.currentIndex++;
    }

    private alertUser(message: string, duration: number = 2000, top: boolean = false): MatSnackBarRef<SimpleSnackBar> {
        return this.snackBar.open(message, "Ok", {
            duration,
            verticalPosition: top ? "top" : "bottom",
            horizontalPosition: "right",
            panelClass: ["snack-bar", "warn"]
        });
    }

    // TODO: Add comeback logic
    private saveState(gameState: GameState): void {
        localStorage.setItem("gameState", JSON.stringify(gameState));
    }

    private loadState(): void {
        JSON.parse(localStorage.getItem("gameState"));
    }
}
