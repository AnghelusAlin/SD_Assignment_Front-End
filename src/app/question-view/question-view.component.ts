import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../services/question.service';
import { AnswerService } from '../services/answer.service';
import { UserService } from '../services/user.service';
import { TagService } from '../services/tag.service';
import { TagModel } from '../entities/tag.model';
import {AnswerModel} from "../entities/answer.model";
import {QuestionTagService} from "../services/questiontag.service";
import {QuestiontagModel} from "../entities/questiontag.model";


@Component({
  selector: 'app-question-view',
  templateUrl: './question-view.component.html',
  styleUrls: ['./question-view.component.scss']
})
export class QuestionViewComponent implements OnInit {
  questionId!: number;
  question: any;
  answers: any[] = [];
  tags: TagModel[] = [];
  tagsOfQuestion: TagModel[] = [];
  selectedTag: string = '';
  currentUser: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionService: QuestionService,
    private answerService: AnswerService,
    private questionTagService: QuestionTagService,
    private userService: UserService,
    private tagService: TagService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.questionId = +params.get('id')!;
      this.loadQuestion();
      this.loadAnswers();
      this.fetchTags();
      this.fetchTagsOfQuestion();
    });
    this.userService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
  }

  loadQuestion() {
    this.questionService.getQuestionById(this.questionId).subscribe(question => {
      this.question = question;
    });
    this.fetchTagsOfQuestion();
  }

  loadAnswers() {
    this.answerService.getAnswersOfQuestion(this.questionId).subscribe(answers => {
      this.answers = answers;
    });
  }

  fetchTagsOfQuestion() {
    this.tagService.getTagsOfQuestion(this.questionId).subscribe(tags => {
      this.tagsOfQuestion = tags;
    });
  }

  fetchTags() {
    this.tagService.getTags().subscribe(tags => {
      this.tags = tags;
    });
  }

  isModeratorOrAuthor(entity: any) {
    return this.currentUser && (this.currentUser.username === entity.user?.username || this.currentUser.moderator);
  }

  deleteQuestion() {
    this.questionService.deleteQuestion(this.question.id).subscribe(
      () => {
        console.log('Question deleted successfully!');
        this.router.navigate(['/questions']);
      },
      error => {
        console.error('Error deleting question:', error);
      }
    );
  }

  deleteAnswer(answerId: number) {
    this.answerService.deleteAnswer(answerId).subscribe(
      () => {
        console.log('Answer deleted successfully!');
        this.loadAnswers();
      },
      error => {
        console.error('Error deleting answer:', error);
      }
    );
  }

  addTag(): void {
    console.log(this.selectedTag);
    const existingTag = this.tags.find(tag => tag.text === this.selectedTag);
    if(existingTag) {
      let questionTag :QuestiontagModel = new QuestiontagModel();
      questionTag.question = this.question
      questionTag.tagId = existingTag

      this.questionTagService.insertQuestionTag(questionTag).subscribe(
        () => {
          console.log('Tag added successfully!');
          this.selectedTag = '';
          this.fetchTagsOfQuestion();
        },
        error => {
          console.error('Error adding tag:', error);
        }
      );
    }
  }
  editAnswer(answer: AnswerModel):void{
    if(answer.answerId){
      this.deleteAnswer(answer.answerId)
    }
    if(this.question.questionId){
      this.router.navigate(['/add-answer', this.question.questionId]);
    }
  }
}
