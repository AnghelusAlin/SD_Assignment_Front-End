import {QuestionModel} from "./question.model";
import {TagModel} from "./tag.model";

export class QuestiontagModel{
  id: number = 1
  question: QuestionModel | undefined
  tag: TagModel | undefined
}
