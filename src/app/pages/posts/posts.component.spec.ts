import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostsComponent } from './posts.component';
import { GetPostDataService } from 'src/app/service/get-post-data/get-post-data.service';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { PostItemComponent } from 'src/app/components/post-item/post-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient } from '@angular/common/http';
import { IPosts } from 'src/app/configurations/models/posts.model';
import { Feed_Types } from 'src/app/configurations/enums/story-types.enum';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let mockService: jasmine.SpyObj<GetPostDataService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  const initMockBatch: IPosts[] = [
    {
      id: 1,
      by: 'user1',
      score: 10,
      title: 'Post 1',
      kids: [123, 133, 222],
    } as IPosts,
    { id: 2, by: 'user2', score: 20, title: 'Post 2' } as IPosts,
  ];

  beforeEach(() => {
    mockService = jasmine.createSpyObj('GetPostDataService', [
      'fetchStories',
      'fetchNextBatch',
    ]);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      declarations: [PostsComponent, PostItemComponent],
      providers: [
        { provide: GetPostDataService, useValue: mockService },
        { provide: HttpClient, useValue: httpClientSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ feedType: 'beststories' })),
          },
        },
      ],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    mockService.fetchStories.and.returnValue(of([]));
    mockService.fetchNextBatch.and.returnValue(of(initMockBatch));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('should call fetchStories, handle errors and called handleError()', () => {
      const mockError = new Error('API error');
      mockService.fetchStories.and.returnValue(throwError(() => mockError));
      const handleErrorSpy = spyOn<any>(component, 'handleError');

      component.ngOnInit();

      expect(mockService.fetchStories).toHaveBeenCalledWith(
        Feed_Types.beststories
      );
      expect(handleErrorSpy).toHaveBeenCalled();
    });
  });

  describe('onScroll() ', () => {
    it('should not load next batch if already loading', () => {
      spyOn(component, 'loadNextBatch');
      component.loading = true;
      component['onScroll']();
      expect(component.loadNextBatch).not.toHaveBeenCalled();
    });

    it('should not load next batch if not at bottom yet', () => {
      spyOn(component, 'loadNextBatch');
      component.loading = false;

      spyOnProperty(window, 'innerHeight', 'get').and.returnValue(500);
      spyOnProperty(window, 'scrollY', 'get').and.returnValue(100);
      spyOnProperty(document.body, 'offsetHeight', 'get').and.returnValue(2000);

      component['onScroll']();

      expect(component.loadNextBatch).not.toHaveBeenCalled();
    });

    it('should load next batch if scrolled near bottom', () => {
      spyOn(component, 'loadNextBatch');
      component.loading = false;

      spyOnProperty(window, 'innerHeight', 'get').and.returnValue(1000);
      spyOnProperty(window, 'scrollY', 'get').and.returnValue(950);
      spyOnProperty(document.body, 'offsetHeight', 'get').and.returnValue(980);

      component['onScroll']();

      expect(component.loadNextBatch).toHaveBeenCalled();
    });
  });
});
