import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostItemsComponent } from './post-items.component';
import { CommonModule } from '@angular/common';

describe('PostItemsComponent', () => {
  let component: PostItemsComponent;
  let fixture: ComponentFixture<PostItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostItemsComponent],
      imports: [CommonModule],
    });
    fixture = TestBed.createComponent(PostItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
