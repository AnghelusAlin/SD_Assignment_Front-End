import { TestBed } from '@angular/core/testing';

import { QuestionlikeService } from './questionlike.service';

describe('QuestionlikeService', () => {
  let service: QuestionlikeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionlikeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
