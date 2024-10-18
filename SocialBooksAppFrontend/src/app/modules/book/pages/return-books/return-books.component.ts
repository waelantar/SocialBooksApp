import {Component, OnInit} from '@angular/core';
import {BookService} from "../../../../services/services/book.service";
import {FeedbackService} from "../../../../services/services/feedback.service";
import {PageResponseBorrowedBookResponse} from "../../../../services/models/page-response-borrowed-book-response";
import {FeedbackRequest} from "../../../../services/models/feedback-request";
import {BorrowedBookResponse} from "../../../../services/models/borrowed-book-response";

@Component({
  selector: 'app-return-books',
  standalone: true,
  imports: [],
  templateUrl: './return-books.component.html',
  styleUrl: './return-books.component.scss'
})
export class ReturnBooksComponent implements OnInit{
  constructor(private bookService: BookService,private feedbackService: FeedbackService) {

  }

  ngOnInit(): void {
    this.finsAllReturnedBooks();
  }
  returnedBooks: PageResponseBorrowedBookResponse={};
  page=0;
  size=5;
  pages: any = [];
  message='';
  level='success';



  private finsAllReturnedBooks() {
    this.bookService.findAllReturnedBooks({
      page:this.page,
      size:this.size
    }).subscribe({
      next:(resp)=>
      {
        this.returnedBooks=resp;
        this.pages = Array(this.returnedBooks.totalPages)
          .fill(0)
          .map((x, i) => i);

      }
    })
  }
  gotToPage(page: number) {
    this.page = page;
    this.finsAllReturnedBooks();
  }

  goToFirstPage() {
    this.page = 0;
    this.finsAllReturnedBooks();
  }

  goToPreviousPage() {
    this.page --;
    this.finsAllReturnedBooks();
  }

  goToLastPage() {
    this.page = this.returnedBooks.totalPages as number - 1;
    this.finsAllReturnedBooks();
  }

  goToNextPage() {
    this.page++;
    this.finsAllReturnedBooks();
  }

  get isLastPage() {
    return this.page === this.returnedBooks.totalPages as number - 1;
  }


  approveBookReturn(book: BorrowedBookResponse) {
    if(!book.returned)
    {this.level='error';
      this.message='The book is not yet returned';
      return;
    }
    this.bookService.approveReturnBorrowBook({
      'book-id':book.id as number}).subscribe(
      {
        next:()=>
        {
        this.level='success';
        this.message='Book return approved';
        this.finsAllReturnedBooks();
        }
      }

    )
  }


}

