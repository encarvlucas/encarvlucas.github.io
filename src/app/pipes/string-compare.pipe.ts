import { Pipe, PipeTransform } from "@angular/core";
import { Guess } from "../models/guess.model";

@Pipe({
    name: "compare"
})
export class StringComparePipe implements PipeTransform {

    transform(answer: string, guess: Guess): boolean {
        try {
            return guess.answers
                .map(item => item.toLowerCase())
                .includes(answer.toLowerCase());
        } catch {
            return false;
        }
    }

}
