import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BookResponse} from "../../../../services/models/book-response";

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss'
})
export class BookCardComponent {
  private _book:BookResponse={}

  get book(): BookResponse {
    return this._book;
  }

@Input()
  set book(value: BookResponse) {
    this._book = value;
  }

private _manage:boolean=false;

  get manage(): boolean {
    return this._manage;
  }
@Input()
  set manage(value: boolean) {
    this._manage = value;
  }

  private _bookCover:string | undefined;

  get bookCover(): string | undefined {
    if(this._bookCover)
    {
      return 'data:image/jpg;base64,' + this._book.cover
    }
    return '//www.html.am/images/html-codes/links/boracay-white-beach-sunset-300x225.jpg';
  }
@Output() private share:EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private archive:EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private addToWaitingList:EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private borrow:EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private edit:EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private details:EventEmitter<BookResponse> = new EventEmitter<BookResponse>();

  onShowDetails() {
this.details.emit(this._book);
  }

  onBorrow() {
    this.borrow.emit(this._book);

  }

  onAddToWaitingList() {
    this.addToWaitingList.emit(this._book);

  }

  onEdit() {
    this.edit.emit(this._book);

  }

  onShare() {
    this.share.emit(this._book);

  }

  onArchive() {
    this.archive.emit(this._book);

  }
}
