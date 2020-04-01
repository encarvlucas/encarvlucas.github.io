import { Pipe, PipeTransform } from "@angular/core";
import { Guess } from "../models/guess.model";

@Pipe({
    name: "compare"
})
export class StringComparePipe implements PipeTransform {

    transform(answer: string, guess: Guess): boolean {
        try {
            return guess.answers
                .map(item => this.normalize(item))
                .includes(this.normalize(answer));
        } catch {
            return false;
        }
    }

    normalize(text: string): string {
        return text
            .toLowerCase() // Remove case sensitivity
            .normalize("NFD") // Split special characters in regular characters plus accents
            .replace(/[\u0300-\u036f]/g, "") // Remove accents
            .replace(/^the\s/, "") // Remove ambigous article "The "
            .replace(/^[ao]s?\s/, "") // Remove ambigous article "[AO] " for pt-br
            .replace(/[\s\-\_\']/g, "") // Remove whitespaces, hifens, underscores and other special characters
            ;
    }
}
