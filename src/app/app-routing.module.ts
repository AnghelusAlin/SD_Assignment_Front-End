import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login-component/login.component";
import {TestComponent} from "./test-component/test.component";
import {UsersComponent} from "./user-component/users.component";
import {QuestionsComponent} from "./question-component/questions.component";
import {AnswersComponent} from "./answer-component/answers.component";
import {RegisterComponent} from "./register-component/register.component";
import {QuestionViewComponent} from "./question-view/question-view.component";
import {AuthGuard} from "./auth.guard";
import {QuestionFormComponent} from "./question-form/question-form.component";

const routes: Routes = [
  {path:"question/:id", component: QuestionViewComponent, canActivate: [AuthGuard]},
  {path:"login", component: LoginComponent},
  {path:"register", component: RegisterComponent},
  {path:"users", component: UsersComponent, canActivate: [AuthGuard]},
  {path:"questions", component: QuestionsComponent, canActivate: [AuthGuard]},
  {path:"answers", component: AnswersComponent, canActivate: [AuthGuard]},
  {path:"test", component: TestComponent, canActivate: [AuthGuard]},
  {path:"add-question", component: QuestionFormComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
