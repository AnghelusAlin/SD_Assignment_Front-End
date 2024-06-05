import {UserModel} from "./user.model";

export class QuestionModel{
  questionId: number | undefined
  user: UserModel | undefined
  title:  string  = "dummy title"
  text:   string  = "dummy text"
  time:   Date    | undefined
  image:  string  = "https://picsum.photos/200"
}
