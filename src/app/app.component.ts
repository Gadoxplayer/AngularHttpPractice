import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Post } from "./post.model";
import { PostService } from "./post.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;

  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit() {
    this.isFetching = true;
    this.postService.fetchPost().subscribe(post => {
      this.isFetching = false;
      this.loadedPosts = post;
    });
  }

  onCreatePost(postData: Post ) {
    // Send Http request
    // console.log(postData);
    // this.http
    //   .post<{ name: string }>( //this can be set in a Service for better code
    //     "https://ng-practice-ac176-default-rtdb.firebaseio.com/post.json",
    //     postData
    //   )
    //   .subscribe((responseData) => {
    //     console.log(responseData);
    //   });
    this.postService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postService.fetchPost().subscribe(post => {
      this.isFetching = false;
      this.loadedPosts = post;
    });
  }

  onClearPosts() {
    // Send Http request
  }

}
