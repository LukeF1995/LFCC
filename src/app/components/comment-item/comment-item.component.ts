import { Component, Input, OnInit } from '@angular/core';
import { IComments } from 'src/app/configurations/models/comments.models';
import { GetPostDataService } from 'src/app/service/get-post-data/get-post-data.service';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
})
export class CommentItemComponent implements OnInit {
  @Input() comment!: IComments;
  nestedCommentsIds: number[] | undefined;
  nestedComments?: IComments[];
  showReplies: boolean;
  loadingComments: boolean;

  constructor(private getPostDataService: GetPostDataService) {
    this.showReplies = false;
    this.loadingComments = false;
  }

  //checking if the comments passed to the components have any repies
  ngOnInit(): void {
    const nestedComments = this.comment?.kids;
    if (nestedComments) {
      this.nestedCommentsIds = nestedComments;
    }
  }

  toggleReplies() {
    this.showReplies = !this.showReplies;
  }

  //Initial load of the replies to each comment
  viewReplies(event: Event) {
    event.stopPropagation();

    if (this.showReplies || this.nestedComments?.length) {
      this.toggleReplies();
      return;
    }

    this.loadingComments = true;

    this.getPostDataService
      .fetchComments(this.nestedCommentsIds!)
      .subscribe((comments) => {
        this.nestedComments = comments;
        this.loadingComments = false;
        this.toggleReplies();
      });
  }
}
