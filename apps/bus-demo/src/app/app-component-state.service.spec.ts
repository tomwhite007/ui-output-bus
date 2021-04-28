import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BooksFacade } from './+state/books.facade';

import { AppComponentStateService } from './app-component-state.service';

describe('AppComponentStateService', () => {
  let service: AppComponentStateService;

  beforeEach(() => {
    const mockFacade = {
      loaded$: of(true),
      allBooks$: of([]),
      selectedBook$: of(null),
      selectedId$: of(null),
    };

    TestBed.configureTestingModule({
      providers: [
        AppComponentStateService,
        { provide: BooksFacade, useValue: mockFacade },
      ],
    });
    service = TestBed.inject(AppComponentStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
