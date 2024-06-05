import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from '../services/question.service';
import {UserService} from "../services/user.service";
import {QuestionModel} from "../entities/question.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {
  questionForm!: FormGroup;
  private optional: number | undefined

  constructor(private formBuilder: FormBuilder,
              private route : ActivatedRoute,
              private questionService: QuestionService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.optional = params['optional'];
    });
    this.questionForm = this.formBuilder.group({
      title: ['', Validators.required],
      text: ['', Validators.required],
      image: ['https://picsum.photos/200', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.questionForm.valid) {
      const formData = this.questionForm.value;
      const currentUser = this.userService.currentUser;
      let question : QuestionModel =  new QuestionModel()
      question.user = currentUser
      question.title = formData.title
      question.text = formData.text
      question.image = formData.image
      question.time = new Date()
      if(this.optional){
        question.questionId = this.optional
      }
      this.questionService.insertQuestion(question).subscribe(
        () => {
          console.log('Question added successfully!');
          this.questionForm.reset();
        },
        error => {
          console.error('Error adding question:', error);
        }
      );
    }
  }
}
