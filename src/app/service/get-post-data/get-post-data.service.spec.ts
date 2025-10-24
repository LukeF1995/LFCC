import { TestBed } from '@angular/core/testing';

import { GetPostDataService } from './get-post-data.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { IPosts } from 'src/app/configurations/models/posts.model';
import { IComments } from 'src/app/configurations/models/comments.models';

describe('GetDataService', () => {
  let service: GetPostDataService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  const baseUrl = 'https://hacker-news.firebaseio.com/v0/';

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

  it('should fetch top stories', () => {
    const mockIds = [123, 333, 234];
    httpClientSpy.get.and.returnValue(of(mockIds));

    service.fetchStrories().subscribe((ids) => {
      expect(ids).toEqual(mockIds);
    });
  });

  it('should fetch a single post', () => {
    const mockPost: IPosts = {} as IPosts;
    httpClientSpy.get.and.returnValue(of(mockPost));

    service.fetchSinglePost(1111).subscribe((post) => {
      expect(post).toEqual(mockPost);
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
