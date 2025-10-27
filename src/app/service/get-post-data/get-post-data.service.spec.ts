import { TestBed } from '@angular/core/testing';

import { GetPostDataService } from './get-post-data.service';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { IPosts } from 'src/app/configurations/models/posts.model';
import { IComments } from 'src/app/configurations/models/comments.models';
import { Feed_Types } from 'src/app/configurations/enums/story-types.enum';

describe('GetDataService', () => {
  let service: GetPostDataService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const httpSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        GetPostDataService,
        { provide: HttpClient, useValue: httpSpy },
      ],
    });
    service = TestBed.inject(GetPostDataService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('fetchStories(feedTypes)', () => {
    it('should fetch best stories', () => {
      const mockIds = [123, 333, 234];
      httpClientSpy.get.and.returnValue(of(mockIds));

      service.fetchStories(Feed_Types.beststories).subscribe((ids) => {
        expect(ids).toEqual(mockIds);
      });
    });
    it('should handle and throw an error', () => {
      const mockError = new Error('Network error');
      httpClientSpy.get.and.returnValue(throwError(() => mockError));

      service.fetchStories(Feed_Types.newstories).subscribe({
        error: (err) => {
          expect(err).toBe(mockError);
        },
      });
    });
  });

  describe('fetchItem<T>()', () => {
    it('should fetch a single item', () => {
      const mockPost: IPosts = {
        id: 1111,
        title: 'Some sort of post',
      } as IPosts;

      httpClientSpy.get.and.returnValue(of(mockPost));

      service.fetchItem<IPosts>(1111).subscribe({
        next: (post) => {
          expect(post).toEqual(mockPost);
        },
      });
    });

    it('should handle error and throw it', () => {
      const mockError = new Error('error');
      httpClientSpy.get.and.returnValue(throwError(() => mockError));

      service.fetchItem<IPosts>(1111).subscribe({
        error: (err) => {
          expect(err).toBe(mockError);
        },
      });
    });
  });

  it('should fetch array of comments', () => {
    const mockCommentIds = [123, 1444];
    const mockComments: IComments[] = [{} as IComments, {} as IComments];
    httpClientSpy.get.and.returnValue(of(mockComments[0]));
    service.fetchComments(mockCommentIds).subscribe((comments) => {
      expect(comments).toEqual(mockComments);
    });
  });
});
