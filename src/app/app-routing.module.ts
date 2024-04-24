import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login-component/login.component";
import {TestComponent} from "./test-component/test.component";
import {UsersComponent} from "./user-component/users.component";
import {QuestionsComponent} from "./question-component/questions.component";
import {AnswersComponent} from "./answer-component/answers.component";
import {RegisterComponent} from "./register-component/register.component";

const routes: Routes = [
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
