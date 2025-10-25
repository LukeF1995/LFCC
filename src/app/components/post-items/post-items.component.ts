import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IPosts } from 'src/app/configurations/models/posts.model';

@Component({
  selector: 'app-post-items',
  templateUrl: './post-items.component.html',
  styleUrls: ['./post-items.component.scss'],
})
export class PostItemsComponent {
  @Input() postItem!: IPosts;
  @Input() viewingComment?: boolean;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToPostComments() {
    this.router.navigate(['/comments', this.postItem.id]);
  }
}
