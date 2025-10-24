import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, forkJoin, Subject } from 'rxjs';
import { IPosts } from '../configurations/models/posts.model';

@Injectable({
  providedIn: 'root',
})
export class GetDataService {
  private topIds: number[] = [];
  private readonly baseUrl: string = 'https://hacker-news.firebaseio.com/v0/';

  constructor(private http: HttpClient) {}

  //Getting the top stories
  fetchTopStrories(): Observable<number[]> {
    return this.http.get<number[]>(`${this.baseUrl}topstories.json`).pipe(
      map((ids) => {
        this.topIds = ids;
        return ids;
      })
    );
  }

  //getting next batch of posts for the infinite scrolling
  fetchNextBatch(start: number, limit: number): Observable<IPosts[]> {
    const batchIds = this.topIds.slice(start, start + limit);

    const batchRequests = batchIds.map((id) =>
      this.http.get<IPosts>(`${this.baseUrl}item/${id}.json`)
    );
    return forkJoin(batchRequests);
  }
}
