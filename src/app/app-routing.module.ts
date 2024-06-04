import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login-component/login.component";
import {TestComponent} from "./test-component/test.component";
import {UsersComponent} from "./user-component/users.component";
import {QuestionsComponent} from "./question-component/questions.component";
import {AnswersComponent} from "./answer-component/answers.component";
import {RegisterComponent} from "./register-component/register.component";
import {QuestionViewComponent} from "./question-view/question-view.component";

const routes: Routes = [
  {path:"question:/id", component: QuestionViewComponent},
  {path:"login", component: LoginComponent},
  {path:"register", component: RegisterComponent},
  {path:"users", component: UsersComponent},
  {path:"questions", component: QuestionsComponent},
  {path:"answers", component: AnswersComponent},
  {path:"test", component: TestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
