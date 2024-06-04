import { TestBed } from '@angular/core/testing';

import { QuestiontagService } from './questiontag.service';

describe('QuestiontagService', () => {
  let service: QuestiontagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestiontagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
