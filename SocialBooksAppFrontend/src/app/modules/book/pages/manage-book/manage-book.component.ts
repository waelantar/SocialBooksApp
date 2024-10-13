import { Component } from '@angular/core';
import {BookRequest} from "../../../../services/models/book-request";
import {FormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
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
export class ManageBookComponent {
  constructor(private bookService: BookService,private router: Router) {

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
