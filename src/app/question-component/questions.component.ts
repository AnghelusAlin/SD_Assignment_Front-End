import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-question-component',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  questions: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.fetchQuestions();
  }

  fetchQuestions() {
    this.dataService.getQuestions().subscribe(data => {
      this.questions = data;
    });
  }
}
