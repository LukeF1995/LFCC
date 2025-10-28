import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostItemComponent } from './post-item.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IPosts } from 'src/app/configurations/models/posts.model';

describe('PostItemsComponent', () => {
  let component: PostItemComponent;
  let fixture: ComponentFixture<PostItemComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [PostItemComponent],
      providers: [
        {
          provide: Router,
          useValue: routerSpy,
        },
      ],
      imports: [CommonModule],
    });
    fixture = TestBed.createComponent(PostItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should navigate to the correct comments route', () => {
    component.postItem = { id: 123 } as IPosts;

    component.goToPostComments();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/comments', 123]);
  });
});
