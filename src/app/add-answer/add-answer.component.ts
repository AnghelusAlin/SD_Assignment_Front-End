import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnswerService } from '../services/answer.service';
import { HttpErrorResponse } from '@angular/common/http';
import {AnswerModel} from "../entities/answer.model";
import {QuestionModel} from "../entities/question.model";
import {QuestionService} from "../services/question.service";
import {UserService} from "../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-add-answer',
  templateUrl: './add-answer.component.html',
  styleUrls: ['./add-answer.component.scss']
})
export class AddAnswerComponent implements OnInit {
  questionId!: number;
  answerForm!: FormGroup;
  question!: QuestionModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private answerService: AnswerService,
    private questionService: QuestionService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.route.paramMap.subscribe(params =>{
      this.questionId = +params.get('id')!;
      this.loadQuestion();
    });
    this.answerForm = this.formBuilder.group({
      title: ['', Validators.required],
      text: ['', Validators.required],
      image: ['https://picsum.photos/200', Validators.required]
    });
  }

  loadQuestion() {
    this.questionService.getQuestionById(this.questionId).subscribe(
      (question) => {
        this.question = question;
      },
      (error) => {
        console.error('Error loading question:', error);
      }
    );
  }
  onSubmit() {
    if (this.answerForm.valid) {

      let ans = new AnswerModel()
      ans.text = this.answerForm.value.text
      ans.image = this.answerForm.value.image
      ans.question = this.question
      ans.user = this.userService.currentUser
      ans.time = new Date()
      ans.title = this.answerForm.value.title

      this.answerService.insertAnswer(ans).subscribe(
        () => {
          console.log('Answer added successfully!');
        },
        error => {
          console.error('Error adding answer:', error);
        }
      );
    }
  }
}
