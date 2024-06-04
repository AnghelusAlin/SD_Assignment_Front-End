import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../services/question.service';
import { AnswerService } from '../services/answer.service';

@Component({
  selector: 'app-question-view',
  templateUrl: './question-view.component.html',
  styleUrls: ['./question-view.component.scss']
})
export class QuestionViewComponent implements OnInit {
  questionId!: number;
  question: any;
  answers!: any[];

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private answerService: AnswerService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.questionId = +params.get('id')!; // Use non-null assertion operator (!)
      this.loadQuestion();
      this.loadAnswers();
    });
  }

  loadQuestion() {
    this.questionService.getQuestionById(this.questionId).subscribe(question => {
      this.question = question;
    });
  }

  loadAnswers() {
    this.answerService.getAnswersOfQuestion(this.questionId).subscribe(answers => {
      this.answers = answers;
    });
  }
}
