import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from "./login-component/login.component";
import {ButtonModule} from "primeng/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TestComponent} from "./test-component/test.component";
import { UsersComponent } from './user-component/users.component';
import { QuestionsComponent } from './question-component/questions.component';
import { AnswersComponent } from './answer-component/answers.component';
import { RegisterComponent } from './register-component/register.component';
import { QuestionViewComponent } from './question-view/question-view.component';
import { QuestionFormComponent } from './question-form/question-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TestComponent,
    UsersComponent,
    QuestionsComponent,
    AnswersComponent,
    RegisterComponent,
    QuestionViewComponent,
    QuestionFormComponent
  ],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        ButtonModule,
        FormsModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
