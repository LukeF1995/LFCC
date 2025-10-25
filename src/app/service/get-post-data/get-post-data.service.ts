import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, forkJoin, Subject, of } from 'rxjs';
import { IPosts } from '../../configurations/models/posts.model';
import { IComments } from '../../configurations/models/comments.models';
import { Feed_Types } from 'src/app/configurations/enums/story-types.enum';
@Injectable({
  providedIn: 'root',
})
export class GetPostDataService {
  private topIds: number[] = [];
  private readonly baseUrl: string = 'https://hacker-news.firebaseio.com/v0/';
  private fetchingBatch = false;
  constructor(private http: HttpClient) {}

  //Getting the top stories
  fetchStrories(storyType: Feed_Types): Observable<number[]> {
    return this.http.get<number[]>(`${this.baseUrl}${storyType}.json`).pipe(
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

  fetchSinglePost(postId: number): Observable<IPosts> {
    return this.http.get<IPosts>(`${this.baseUrl}item/${postId}.json`);
  }

  fetchComments(commentIds: number[]): Observable<IComments[]> {
    const commentsRequest = commentIds.map((id) =>
      this.http.get<IComments>(`${this.baseUrl}item/${id}.json`)
    );
    return forkJoin(commentsRequest);
  }
}
