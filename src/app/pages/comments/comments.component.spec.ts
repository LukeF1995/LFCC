import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsComponent } from './comments.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { GetPostDataService } from 'src/app/service/get-post-data/get-post-data.service';
import { IPosts } from 'src/app/configurations/models/posts.model';
import { IComments } from 'src/app/configurations/models/comments.models';
import { of } from 'rxjs';
import { PostItemsComponent } from 'src/app/components/post-items/post-items.component';

describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;
  let mockService: jasmine.SpyObj<GetPostDataService>;

  const mockPost: IPosts = {} as IPosts;

  const mockComments: IComments[] = [
    {
      id: 101,
      by: 'thatFella',
      text: 'good post',
      time: 123,
      kids: [],
      parent: 1234,
      type: 'comment',
    },
  ];

  beforeEach(() => {
    mockService = jasmine.createSpyObj('GetPostDataService', [
      'fetchSinglePost',
      'fetchComments',
    ]);

    TestBed.configureTestingModule({
      declarations: [CommentsComponent, PostItemsComponent],
      imports: [RouterModule],
      providers: [
        { provide: GetPostDataService, useValue: mockService },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: new Map([['postId', '1']]) } },
        },
      ],
    });
    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;

    mockService.fetchSinglePost.and.returnValue(of(mockPost));
    mockService.fetchComments.and.returnValue(of(mockComments));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
