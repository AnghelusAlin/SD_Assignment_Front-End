import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { TagService } from '../services/tag.service';
import { UserService } from '../services/user.service';
import {TagModel} from "../entities/tag.model";

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
  searchTitle: string = '';
  selectedTag: string = '';
  selectedUser: string = '';
  currentUser: string = 'currentUser'; // Replace with the actual current user's username

  constructor(private questionService: QuestionService, private tagService: TagService, private userService: UserService) { }

  ngOnInit(): void {
    this.fetchQuestions();
    this.fetchTags();
    this.fetchUsers();
  }

  fetchQuestions() {
    this.questionService.getQuestions().subscribe(data => {
      this.questions = data;
      this.filteredQuestions = data; // Initialize filteredQuestions with all questions
      this.filterQuestions(); // Apply initial filtering
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

  filterQuestions() {
    this.filteredQuestions = this.questions.filter(question => {
      const isTitleMatch = !this.searchTitle || question.title.includes(this.searchTitle);
      const isTagMatch = !this.selectedTag || question.tags.some((tag: TagModel) => tag?.text === this.selectedTag);
      const isUserMatch = !this.selectedUser || question.user?.username === this.selectedUser; // Use optional chaining here
      return isTitleMatch && isTagMatch && isUserMatch;
    });
  }


  resetFilters() {
    this.searchTitle = '';
    this.selectedTag = '';
    this.selectedUser = '';
    this.filterQuestions();
  }
}
