import { TestBed } from '@angular/core/testing';

import { AnswerlikeService } from './answerlike.service';

describe('AnswerlikeService', () => {
  let service: AnswerlikeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnswerlikeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
