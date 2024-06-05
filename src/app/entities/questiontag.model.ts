import {QuestionModel} from "./question.model";
import {TagModel} from "./tag.model";

export class QuestiontagModel{
  questionTagId: number = 1
  question: QuestionModel | undefined
  tagId: TagModel | undefined
}
