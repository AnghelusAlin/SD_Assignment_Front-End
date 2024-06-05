import {UserModel} from "./user.model";
import {QuestionModel} from "./question.model";

export class AnswerModel{
  answerId: number | undefined
  question: QuestionModel | undefined
  user: UserModel | undefined
  title:  string = "dummy title"
  text: string  = "dummy text"
  time: Date | undefined
  image: string = "https://picsum.photos/200"
}
