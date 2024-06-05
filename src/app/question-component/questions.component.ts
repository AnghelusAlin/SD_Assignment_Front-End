import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { QuestionTagService } from '../services/questiontag.service';
import { TagService } from '../services/tag.service';
import { UserService } from '../services/user.service';
import {TagModel} from "../entities/tag.model";
import {Router} from "@angular/router";

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
  questionTags: any[] = [];
  questionTagsMap: { [key: number]: TagModel[] } = {};
  searchTitle: string = '';
  selectedTag: string = '';
  selectedUser: string = '';
  currentUser: string = 'currentUser'; // Replace with the actual current user's username

  constructor(private questionService: QuestionService,
              private tagService: TagService,
              private userService: UserService,
              private questionTagService: QuestionTagService,
              private router : Router) { }

  ngOnInit(): void {
    this.fetchQuestions();
    this.fetchTags();
    this.fetchUsers();
    this.fetchQuestionTags();
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
}
