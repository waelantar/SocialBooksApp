import {Component, OnInit} from '@angular/core';
import {BookRequest} from "../../../../services/models/book-request";
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {BookService} from "../../../../services/services/book.service";

@Component({
  selector: 'app-manage-book',
  standalone: true,
  imports: [

    FormsModule,
    RouterLink
  ],
  templateUrl: './manage-book.component.html',
  styleUrl: './manage-book.component.scss'
})
export class ManageBookComponent implements OnInit {
  constructor(private activatedRoute:ActivatedRoute, private bookService: BookService,private router: Router) {

  }

  ngOnInit(): void {
        const bookId = this.activatedRoute.snapshot.params['bookId'];
        if (bookId) {
          this.bookService.findBookById({'book-id': bookId}).subscribe(
            {
              next:(book) => {
                this.bookRequest={
                  id:bookId,
                  title: book.title as string,
                  authorName:book.authorName as string,
                  isbn:book.isbn as string,
                  synopsis:book.synopsis as string,
                  shareable:book.shareable ,
                }
                if(book.cover)
                {
                  this.selcetedPicture='data:image/jpg;base64, '+book.cover;
                  console.log(book.cover)
                }
              }
            }
          );
        }

    }

  bookRequest: BookRequest={authorName:'',isbn:'',synopsis:'',title:''};
  errorMsg:Array<string>=[];
    selcetedPicture: string | undefined;
  private selectedBookCover: any;

  onFileSelected(event:any) {
    this.selectedBookCover =event.target.files[0];
    console.log(this.selectedBookCover);
    if(this.selectedBookCover){
      const reader = new FileReader();
      reader.onload = () =>
      {
        this.selcetedPicture=reader.result as string;
      }
      reader.readAsDataURL(this.selectedBookCover);
    }
  }
  saveBook()
  {
    this.bookService.saveBook({body:this.bookRequest}).subscribe({
      next:(bookId:number)=>{
        this.bookService.uploadCoverPicture({
          'book-id':bookId,
          body:{
            file:this.selectedBookCover,
          }
        }).subscribe({
          next:()=>{
            this.router.navigate(['/books/my-books']);
          }
        })
      },
      error:(err)=>{
        this.errorMsg=err.error.validationErrors
      }

    });
  }
}
