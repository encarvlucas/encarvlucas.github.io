import { Component, OnInit } from '@angular/core';
import { RandomWordsService } from '../../random-words.service';

@Component({
  selector: 'app-random-words-helper',
  templateUrl: './random-words-helper.component.html',
  styleUrls: ['./random-words-helper.component.scss']
})
export class RandomWordsHelperComponent implements OnInit {
  randomWords: string[] = [];
  randomArticle: any;
  isLoadingWords = false;
  isLoadingArticle = false;

  constructor(
    private randomWordsService: RandomWordsService
  ) { }

  ngOnInit(): void {
    this.rerollWords();
    this.rerollArticle();
  }

  rerollWords() {
    this.isLoadingWords = true;
    this.randomWordsService.getRandomWords().subscribe(
      words => {
        this.randomWords = words;
        this.isLoadingWords = false;
      }
    );
  }

  rerollArticle() {
    this.isLoadingArticle = true;
    this.randomWordsService.getRandomWiki().subscribe(
      article => {
        this.randomArticle = article;
        console.log(article);

        this.isLoadingArticle = false;
      }
    );
  }
}
