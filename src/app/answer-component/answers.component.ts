import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-answer-component',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements OnInit {
  answers: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.fetchAnswers();
  }

  fetchAnswers() {
    this.dataService.getAnswers().subscribe(data => {
      this.answers = data;
    });
  }
}
