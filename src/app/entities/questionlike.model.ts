import {UserModel} from "./user.model";
import {QuestionModel} from "./question.model";

export class AnswerLikeModel{
  likeId: number | undefined
  user: UserModel | undefined
  question: QuestionModel | undefined
  amount: number = 1
}
