import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostItemComponent } from './post-item.component';
import { CommonModule } from '@angular/common';

describe('PostItemsComponent', () => {
  let component: PostItemComponent;
  let fixture: ComponentFixture<PostItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostItemComponent],
      imports: [CommonModule],
    });
    fixture = TestBed.createComponent(PostItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
