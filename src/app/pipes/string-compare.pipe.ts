import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "compare"
})
export class StringComparePipe implements PipeTransform {

    transform(answer: string, guess: string): boolean {
        try {
            return answer.toLowerCase() === guess.toLowerCase();
        } catch {
            return false;
        }
    }

}
