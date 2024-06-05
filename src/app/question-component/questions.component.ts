import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { QuestionTagService } from '../services/questiontag.service';
import { TagService } from '../services/tag.service';
import { UserService } from '../services/user.service';
import {TagModel} from "../entities/tag.model";
import {Router} from "@angular/router";
import {QuestionModel} from "../entities/question.model";
import {QuestionLikeService} from "../services/questionlike.service";
import {QuestionLikeModel} from "../entities/questionlike.model";

@Component({
  selector: 'app-question-component',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  questions: any[] = [];
  filteredQuestions: any[] = [];
  tags: any[] = [];
  users: any[] = [];
  questionLikes: any[] = [];
  questionTagsMap: { [key: number]: TagModel[] } = {};
  searchTitle: string = '';
  selectedTag: string = '';
  selectedUser: string = '';

  constructor(private questionService: QuestionService,
              private tagService: TagService,
              private userService: UserService,
              private questionLikeService: QuestionLikeService,
              private questionTagService: QuestionTagService,
              private router : Router) { }

  ngOnInit(): void {
    this.fetchQuestions();
    this.fetchQuestionLikes();
    this.fetchTags();
    this.fetchUsers();
    this.fetchQuestionTags();
  }
  goToAddAnswer(questionId: number): void {
    if(questionId){
      this.router.navigate(['/add-answer', questionId]);
    }
  }
  fetchQuestionLikes() {
    this.questionLikeService.getQuestionLikes().subscribe(data => {
      const currentUser = this.userService.currentUser;
      if (currentUser) {
        this.questionLikes = data.filter(like => like.user === currentUser);
      }
    });
  }
  isCurrentUserAuthor(question: any): boolean {
    return question.user === this.userService.currentUser;
  }
  isCurrentUserAuthorOrModerator(question: any): boolean{
    return question.user === this.userService.currentUser || this.userService.currentUser.moderator
  }
  isUpvoted(question: QuestionModel): boolean{
    const upvotedQuestion = this.questionLikes.find(like => like.question === question && like.amount === 1);
    return !!upvotedQuestion;
  }
  isDownvoted(question: QuestionModel): boolean{
    const upvotedQuestion = this.questionLikes.find(like => like.question === question && like.amount === -1);
    return !!upvotedQuestion;
  }
  fetchQuestions() {
    this.questionService.getQuestions().subscribe(data => {
      this.questions = data.sort((a, b) => {
        const timeA = new Date(a.time);
        const timeB = new Date(b.time);
        return timeB.getTime() - timeA.getTime();
      });
      this.filteredQuestions = this.questions.slice();
      this.filterQuestions();
    });
  }
  editQuestion(question: QuestionModel){
    this.router.navigate(['/add-question', question.questionId])
  }

  fetchTags() {
    this.tagService.getTags().subscribe(data => {
      this.tags = data;
    });
  }

  fetchUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }
  fetchQuestionTags() {
    this.questionTagService.getQuestionTags().subscribe(data => {
      data.forEach(questionTag => {
        const questionId = questionTag.question.questionId;
        if (!this.questionTagsMap[questionId]) {
          this.questionTagsMap[questionId] = [];
        }
        this.questionTagsMap[questionId].push(questionTag.tag);
      });
    });
  }
  filterQuestions() {
    this.filteredQuestions = this.questions.filter(question => {
      const isTitleMatch = !this.searchTitle || question.title.includes(this.searchTitle);
      const isTagMatch = !this.selectedTag || question.tags.some((tag: TagModel) => tag?.text === this.selectedTag);
      const isUserMatch = !this.selectedUser || question.user?.username === this.selectedUser; // Use optional chaining here
      return isTitleMatch && isTagMatch && isUserMatch;
    });
  }
  goToQuestion(question: any): void {
    if (question && question.questionId) {
      this.router.navigate(['/question', question.questionId]);
    }
  }
  resetFilters() {
    this.searchTitle = '';
    this.selectedTag = '';
    this.selectedUser = '';
    this.filterQuestions();
  }

  voteQuestion(question: QuestionModel, amount: number):void{
    let questionLike: QuestionLikeModel = new QuestionLikeModel()
    questionLike.question = question
    questionLike.user = this.userService.currentUser
    questionLike.amount = amount
    console.log(questionLike)
    if(!this.isUpvoted(question) && !this.isDownvoted(question)) {
      this.questionLikeService.insertQuestionLike(questionLike).subscribe(
        () => {
          console.log('Question upvoted successfully!');
        },
        error => {
          console.error('Error upvoting question:', error);
        }
      );
    }
  }
}
