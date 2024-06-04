import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { TagService } from '../services/tag.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-question-component',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  questions: any[] = [];
  filteredQuestions: any[] = [];
  tags: string[] = [];
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
      return (!this.searchTitle || question.title.includes(this.searchTitle)) &&
        (!this.selectedTag || question.tags.includes(this.selectedTag)) &&
        (!this.selectedUser || question.user.username === this.selectedUser);
    });
  }

  showMyQuestions() {
    this.selectedUser = this.currentUser;
    this.filterQuestions();
  }

  resetFilters() {
    this.searchTitle = '';
    this.selectedTag = '';
    this.selectedUser = '';
    this.filterQuestions();
  }
}
