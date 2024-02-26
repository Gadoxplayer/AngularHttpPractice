import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { map, catchError, tap } from "rxjs/operators";
import { Subject, throwError } from "rxjs";

@Injectable({ providedIn: "root" })
//can also be provied in the providers array in the module
export class PostService {
  error = new Subject<string>();

  //http request methods
  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content };
    console.log(postData);
    this.http
      .post<{ name: string }>( //this can be set in a Service for better code
        "https://ng-practice-ac176-default-rtdb.firebaseio.com/post.json",
        postData,
        {
          observe: 'response'
        }
      )
      .subscribe(
        (responseData) => {
          console.log(responseData);
        },
        (error) => {
          this.error.next(error.message);
        }
      );
  }

  fetchPost() {
    let SearchParams = new HttpParams();
    SearchParams = SearchParams.append("print", "pretty");
    SearchParams = SearchParams.append("custom", "key");
    return (
      this.http
        .get<{ [key: string]: Post }>(
          "https://ng-practice-ac176-default-rtdb.firebaseio.com/post.json",
          {
            headers: new HttpHeaders({
              "custom-Header": "Hello",
            }),
            //params: new HttpParams().set('print', 'pretty')
            params: SearchParams,
          }
        )
        //.pipe(map((responseData: {[key: string]: Post}) => {
        .pipe(
          //this can be set in a Service for better code
          map((responseData) => {
            const postsArray: Post[] = [];
            for (const key in responseData) {
              if (responseData.hasOwnProperty(key)) {
                postsArray.push({ ...responseData[key], id: key });
              }
            }
            return postsArray;
          }),
          catchError((errorMessage) => {
            return throwError(errorMessage);
          })
        )
    );
    //   .subscribe((post) => {
    //     //..
    //   });
    // since im returning this now no http request is send because there is none interested, need tosubscribe to it in the component i need it
  }
  deletePost() {
    return this.http.delete(
      "https://ng-practice-ac176-default-rtdb.firebaseio.com/post.json",
      {
        observe: 'events',
        responseType: 'json'
      }
    ).pipe(tap(event => {
      console.log(event);
      if(event.type === HttpEventType.Sent) {
        console.log(event.type);
      }
      if(event.type === HttpEventType.Response) {
        console.log(event.body);
      }
    }));
  }
}
