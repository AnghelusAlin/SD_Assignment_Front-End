import {UserModel} from "./user.model";
import {AnswerModel} from "./answer.model";

export class AnswerLikeModel{
  likeId: number = 1
  user: UserModel | undefined
  answer: AnswerModel | undefined
  amount: number = 1
}
