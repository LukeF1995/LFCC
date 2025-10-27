import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { IComments } from 'src/app/configurations/models/comments.models';
import { IPosts } from 'src/app/configurations/models/posts.model';
import { GetPostDataService } from 'src/app/service/get-post-data/get-post-data.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  postItem!: IPosts;
  comments: IComments[];

  constructor(
    private getPostDataService: GetPostDataService,
    private route: ActivatedRoute
  ) {
    this.comments = [];
  }
  ngOnInit(): void {
    const postId = +this.route.snapshot.paramMap.get('postId')!;

    if (postId) {
      this.getPostDataService
        .fetchItem<IPosts>(postId)
        .pipe(
          switchMap((post) => {
            this.postItem = post;
            if (post.kids?.length) {
              return this.getPostDataService.fetchComments(post.kids);
            }
            return of([]);
          })
        )
        .subscribe((comments) => {
          this.comments = comments;
        });
    }
  }
}
