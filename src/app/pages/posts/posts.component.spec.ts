import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsComponent } from './posts.component';
import { GetPostDataService } from 'src/app/service/get-post-data/get-post-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { PostItemsComponent } from 'src/app/components/post-items/post-items.component';
import {
  RouterTestingHarness,
  RouterTestingModule,
} from '@angular/router/testing';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let mockService: jasmine.SpyObj<GetPostDataService>;
  let mockRouter: jasmine.SpyObj<Router>;

  const initMockBatch: any[] = [
    { id: 1, by: 'user1', score: 10, title: 'Post 1', url: '', descendants: 0 },
    { id: 2, by: 'user2', score: 20, title: 'Post 2', url: '', descendants: 0 },
  ];

  beforeEach(() => {
    mockService = jasmine.createSpyObj('GetPostDataService', [
      'fetchStrories',
      'fetchNextBatch',
    ]);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [PostsComponent, PostItemsComponent],
      providers: [{ provide: GetPostDataService, useValue: mockService }],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    mockService.fetchStrories.and.returnValue(of([]));
    mockService.fetchNextBatch.and.returnValue(of(initMockBatch));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
