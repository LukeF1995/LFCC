import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of, catchError, tap, throwError } from 'rxjs';
import { IPosts } from '../../configurations/models/posts.model';
import { IComments } from '../../configurations/models/comments.models';
import { Feed_Types } from 'src/app/configurations/enums/story-types.enum';
@Injectable({
  providedIn: 'root',
})
export class GetPostDataService {
  private topIds: number[] = [];
  private readonly baseUrl: string = 'https://hacker-news.firebaseio.com/v0/';

  constructor(private http: HttpClient) {}

  //Getting the stories based on the feed type requested
  fetchStrories(storyType: Feed_Types): Observable<number[]> {
    return this.http.get<number[]>(`${this.baseUrl}${storyType}.json`).pipe(
      tap((ids) => (this.topIds = ids)),
      catchError((error) => {
        console.error(`Error fetching feed `, error);
        return throwError(() => error);
      })
    );
  }

  //getting next batch of posts for the infinite scrolling
  fetchNextBatch(start: number, limit: number): Observable<IPosts[]> {
    const batchIds = this.topIds.slice(start, start + limit);
    const batchRequests = batchIds.map((id) => this.fetchItem<IPosts>(id));
    return forkJoin(batchRequests);
  }

  //Generic fetch methods for Jobs or comments, using same API
  fetchItem<T>(itemId: number): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}item/${itemId}.json`).pipe(
      catchError((error) => {
        console.error(`Failed to fetch items (ID: ${itemId})`, error);
        return throwError(() => error);
      })
    );
  }

  //Fetching all comments based on paramater array
  fetchComments(commentIds: number[]): Observable<IComments[]> {
    const commentsRequest = commentIds.map((id) =>
      this.fetchItem<IComments>(id)
    );
    return forkJoin(commentsRequest);
  }
}
