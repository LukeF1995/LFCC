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
  showReplies: boolean = false;

  constructor(private getPostDataService: GetPostDataService) {}

  ngOnInit(): void {
    const nestedComments = this.comment?.kids;
    if (nestedComments) {
      this.nestedCommentsIds = nestedComments;
    }
  }

  toggleReplies() {
    this.showReplies = !this.showReplies;
  }

  viewReplies(event: Event) {
    event.stopPropagation();

    if (this.showReplies || this.nestedComments?.length) {
      this.toggleReplies();
      return;
    }

    this.getPostDataService
      .fetchComments(this.nestedCommentsIds!)
      .subscribe((comments) => {
        this.nestedComments = comments;
        console.log(this.nestedComments);
        this.toggleReplies();
      });
  }
}
