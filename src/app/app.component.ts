import { Component, OnDestroy, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Post } from "./post.model";
import { PostService } from "./post.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  private errorSub : Subscription;

  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit() {
    //handleing errors with the subject option we weillhave to subscribe to the changes
    this.errorSub = this.postService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });
    this.isFetching = true;
    this.postService.fetchPost().subscribe(post => {
      this.isFetching = false;
      this.loadedPosts = post;
    }, error => {
      this.error = error.message;
    });
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
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
    }, error => {
        this.error = error.message;
        console.log(error);
    });
  }

  onClearPosts() {
    // Send Http request
//my apoproach
    // this.http.delete<{[key: string]: Post}>("https://ng-practice-ac176-default-rtdb.firebaseio.com/post.json")
    //   .subscribe((resdata) => {
    //     console.log(resdata);
    //   });
    //   this.isFetching = true;
    //   this.postService.fetchPost().subscribe(post => {
    //     this.isFetching = false;
    //     this.loadedPosts = post;
    //   });
    this.postService.deletePost().subscribe(() => {
      //this function here will only run if succede
      this.loadedPosts = [];
    });
  }

}
