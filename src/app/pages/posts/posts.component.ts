import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPosts } from 'src/app/configurations/models/posts.model';
import { GetPostDataService } from 'src/app/service/get-post-data/get-post-data.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  posts: IPosts[] = [];
  start: number;
  limit: number;
  loading: boolean;
  allLoaded: boolean;

  constructor(
    private router: Router,
    private getPostDataService: GetPostDataService
  ) {
    this.loading = true;
    this.allLoaded = false;
    this.start = 0;
    this.limit = 20;
  }

  ngOnInit(): void {
    this.getPostDataService
      .fetchStrories()
      .subscribe(() => this.loadNextBatch());
  }

  ngAfterViewInit() {
    // Set up scroll listener after view is ready
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  //Loading new batch, increasing start value to account for additional values
  loadNextBatch() {
    this.loading = true;
    this.getPostDataService
      .fetchNextBatch(this.start, this.limit)
      .subscribe((batch) => {
        this.posts = [...this.posts, ...batch];
        this.start += this.limit;

        this.loading = false;
      });
  }

  //scroll event for infinite scrolling
  private onScroll() {
    if (this.loading) return;

    const scrollPosition = window.scrollY + window.innerHeight;
    const threshold = document.body.offsetHeight - 50;

    if (scrollPosition >= threshold) {
      this.loadNextBatch();
    }
  }
}
