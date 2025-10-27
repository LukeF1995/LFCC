import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentItemComponent } from './comment-item.component';
import { GetPostDataService } from 'src/app/service/get-post-data/get-post-data.service';
import { IComments } from 'src/app/configurations/models/comments.models';
import { of } from 'rxjs';

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

  it('should set nestedCommentsIds if comment has no kids', () => {
    const mockComment: IComments = {
      id: 2,
      text: 'Another comment',
      kids: [111, 22, 34, 424],
    } as IComments;

    component.comment = mockComment;

    component.ngOnInit();

    expect(component.nestedCommentsIds).toBeTruthy();
  });

  describe('viewReplies()', () => {
    let event: MouseEvent;

    beforeEach(() => {
      event = new MouseEvent('click');
      spyOn(event, 'stopPropagation');
      spyOn(component, 'toggleReplies');
    });

    it('should toggle replies and return early if showReplies are true', () => {
      component.showReplies = true;
      component.viewReplies(event);

      expect(event.stopPropagation).toHaveBeenCalled();
      expect(component.toggleReplies).toHaveBeenCalled();
      expect(mockService.fetchComments).not.toHaveBeenCalled();
    });

    it('should toggle replies and return early if nested commments exist', () => {
      const mockNestedComment: IComments[] = [
        {
          id: 2,
          text: 'Another nested comment',
          kids: [111, 22, 34, 424],
        } as IComments,
      ];
      component.nestedComments = mockNestedComment;
      component.viewReplies(event);

      expect(event.stopPropagation).toHaveBeenCalled();
      expect(component.toggleReplies).toHaveBeenCalled();
      expect(mockService.fetchComments).not.toHaveBeenCalled();
    });

    it('should fetch comments and toggle replies when no nested comments exist', () => {
      const mockComments = [{ id: 1, text: 'AnotherComment' } as IComments];

      mockService.fetchComments.and.returnValue(of(mockComments));

      component.nestedCommentsIds = [1, 2];
      component.showReplies = false;
      component.nestedComments = [];

      component.viewReplies(event);

      expect(event.stopPropagation).toHaveBeenCalled();
      expect(mockService.fetchComments).toHaveBeenCalledWith([1, 2]);
      expect(component.nestedComments).toEqual(mockComments);
      expect(component.toggleReplies).toHaveBeenCalled();
    });
  });

  it('should set showReplies to false', () => {
    component.showReplies = true;

    component.toggleReplies();
    expect(component.showReplies).toBeFalsy();
  });
});
