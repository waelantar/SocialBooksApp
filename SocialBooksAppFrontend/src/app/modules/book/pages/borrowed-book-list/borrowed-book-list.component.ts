import {Component, OnInit} from '@angular/core';
import {BorrowedBookResponse} from "../../../../services/models/borrowed-book-response";
import {PageResponseBorrowedBookResponse} from "../../../../services/models/page-response-borrowed-book-response";
import {BookService} from "../../../../services/services/book.service";
import {FeedbackRequest} from "../../../../services/models/feedback-request";
import {FormsModule} from "@angular/forms";
import {RatingComponent} from "../../components/rating/rating.component";
import {RouterLink} from "@angular/router";
import {FeedbackService} from "../../../../services/services/feedback.service";

@Component({
  selector: 'app-borrowed-book-list',
  standalone: true,
  imports: [
    FormsModule,
    RatingComponent,
    RouterLink
  ],
  templateUrl: './borrowed-book-list.component.html',
  styleUrl: './borrowed-book-list.component.scss'
})
export class BorrowedBookListComponent implements OnInit {
  constructor(private bookService: BookService,private feedbackService: FeedbackService) {

  }

  ngOnInit(): void {
        this.finsAllBorrowedBooks();
    }
    borrowedBooks: PageResponseBorrowedBookResponse={};
  feedbackRequest: FeedbackRequest={bookId: 0, comment: "",note:0};
  page=0;
  size=5;
  pages: any = [];
selectedBook:BorrowedBookResponse | undefined=undefined;


  returnBorrowedBook(book: BorrowedBookResponse) {
this.selectedBook=book;
this.feedbackRequest.bookId=book.id as number;
  }

  private finsAllBorrowedBooks() {
    this.bookService.findAllBorrowedBooks({
      page:this.page,
      size:this.size
    }).subscribe({
      next:(resp)=>
      {
        this.borrowedBooks=resp;
        this.pages = Array(this.borrowedBooks.totalPages)
          .fill(0)
          .map((x, i) => i);

      }
    })
  }
  gotToPage(page: number) {
    this.page = page;
    this.finsAllBorrowedBooks();
  }

  goToFirstPage() {
    this.page = 0;
    this.finsAllBorrowedBooks();
  }

  goToPreviousPage() {
    this.page --;
    this.finsAllBorrowedBooks();
  }

  goToLastPage() {
    this.page = this.borrowedBooks.totalPages as number - 1;
    this.finsAllBorrowedBooks();
  }

  goToNextPage() {
    this.page++;
    this.finsAllBorrowedBooks();
  }

  get isLastPage() {
    return this.page === this.borrowedBooks.totalPages as number - 1;
  }

  returnBook(withFeedback: boolean) {
this.bookService.returnBorrowBook({"book-id":this.selectedBook?.id as number}).subscribe(
  {
    next:()=>
    {
      if(withFeedback){
        this.giveFeedback();
        this.selectedBook=undefined;
        this.finsAllBorrowedBooks();
      }
    }
  }
);
  }

  private giveFeedback() {
 this.feedbackService.saveFeedback({
   body:this.feedbackRequest
 }).subscribe(
   {
     next:()=>{

     }
   }
 )
  }
}
