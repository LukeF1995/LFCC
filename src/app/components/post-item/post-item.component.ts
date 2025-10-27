import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IPosts } from 'src/app/configurations/models/posts.model';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss'],
})
export class PostItemComponent {
  @Input() postItem!: IPosts;
  @Input() viewingComment?: boolean;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToPostComments() {
    this.router.navigate(['/comments', this.postItem.id]);
  }
}
