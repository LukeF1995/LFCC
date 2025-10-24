import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetDataService } from '../../service/get-data.service';
import { IPosts } from '../../configurations/models/posts.model';
import { mergeMap } from 'rxjs';

@Component({
  selector: 'app-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.scss'],
})
export class PageLayoutComponent implements OnInit {
  posts: IPosts[] = [];
  start: number;
  limit: number;
  loading: boolean;
  allLoaded: boolean;

  constructor(private router: Router, private getData: GetDataService) {
    this.loading = true;
    this.allLoaded = false;
    this.start = 0;
    this.limit = 20;
  }

  ngOnInit(): void {
    this.getData.fetchTopStrories().subscribe(() => this.loadNextBatch());
  }

  ngAfterViewInit() {
    // Set up scroll listener after view is ready
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  //Loading new batch, increasing start value to account for additional values
  loadNextBatch() {
    console.log('loading');
    this.getData.fetchNextBatch(this.start, this.limit).subscribe((batch) => {
      this.posts = [...this.posts, ...batch];
      this.start += this.limit;
      console.log('loaded');
      this.loading = false;
    });
  }

  //scroll event for infinite scrolling
  private onScroll() {
    if (this.loading) return;
    if (!this.loading) {
      const scrollPosition = window.scrollY + window.innerHeight;
      const threshold = document.body.offsetHeight - 50;

      if (scrollPosition >= threshold) {
        this.loadNextBatch();
      }
    }
  }
}
