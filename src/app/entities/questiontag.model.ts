import {QuestionModel} from "./question.model";
import {TagModel} from "./tag.model";

export class QuestiontagModel{
  questionTagId: number | undefined
  question: QuestionModel | undefined
  tagId: TagModel | undefined
}
