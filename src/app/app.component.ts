import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Post } from "./post.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPost();
  }

  onCreatePost(postData: Post ) {
    // Send Http request
    console.log(postData);
    this.http
      .post<{ name: string }>(
        "https://ng-practice-ac176-default-rtdb.firebaseio.com/post.json",
        postData
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPost()
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPost() {
    this.http
      .get<{[key: string]: Post}>("https://ng-practice-ac176-default-rtdb.firebaseio.com/post.json")
      //.pipe(map((responseData: {[key: string]: Post}) => {
      .pipe(map(responseData => {
        const postsArray: Post[] = [];
        for (const key in responseData) {
          if(responseData.hasOwnProperty(key)){
          postsArray.push({...responseData[key], id: key})
          }
        }
        return postsArray;
      }))
      .subscribe((post) => {
        //..
        this.loadedPosts = post;
      });
  }
}
