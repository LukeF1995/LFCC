import { Component, Input, OnInit } from '@angular/core';
import { IPosts } from 'src/app/configurations/models/posts.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  @Input() postItem!: IPosts;
  postedTime!: string;

  ngOnInit(): void {
    this.postedTime = new Date(this.postItem.time * 1000).toLocaleString();
  }
}
