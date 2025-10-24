import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentItemComponent } from './comment-item.component';
import { GetPostDataService } from 'src/app/service/get-post-data/get-post-data.service';

describe('CommentItemComponent', () => {
  let component: CommentItemComponent;
  let fixture: ComponentFixture<CommentItemComponent>;
  let mockService: jasmine.SpyObj<GetPostDataService>;

  beforeEach(() => {
    mockService = jasmine.createSpyObj('GetPostDataService', ['fetchComments']);
    TestBed.configureTestingModule({
      declarations: [CommentItemComponent],
      providers: [{ provide: GetPostDataService, useValue: mockService }],
    });
    fixture = TestBed.createComponent(CommentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
