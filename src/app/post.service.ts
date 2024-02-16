import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
//can also be provied in the providers array in the module
export class PostService {
  //http request methods
  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = {title: title, content: content}
    console.log(postData);
    this.http
      .post<{ name: string }>( //this can be set in a Service for better code
        "https://ng-practice-ac176-default-rtdb.firebaseio.com/post.json",
        postData
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  fetchPost() {
    return this.http
      .get<{[key: string]: Post}>("https://ng-practice-ac176-default-rtdb.firebaseio.com/post.json")
      //.pipe(map((responseData: {[key: string]: Post}) => {
      .pipe( //this can be set in a Service for better code
        map(responseData => {
        const postsArray: Post[] = [];
        for (const key in responseData) {
          if(responseData.hasOwnProperty(key)){
          postsArray.push({...responseData[key], id: key})
          }
        }
        return postsArray;
      }))
    //   .subscribe((post) => {
    //     //..
    //   });
    // since im returning this now no http request is send because there is none interested, need tosubscribe to it in the component i need it
  }
  deletePost() {
    return this.http.delete('https://ng-practice-ac176-default-rtdb.firebaseio.com/post.json');
  }
}
