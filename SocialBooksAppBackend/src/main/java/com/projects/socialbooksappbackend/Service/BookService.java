package com.projects.socialbooksappbackend.Service;

import com.projects.socialbooksappbackend.Dto.BookRequest;
import com.projects.socialbooksappbackend.Dto.BookResponse;
import com.projects.socialbooksappbackend.Entity.Book;
import com.projects.socialbooksappbackend.Entity.User;
import com.projects.socialbooksappbackend.Mapper.BookMapper;
import com.projects.socialbooksappbackend.Repository.BookRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class BookService {

    private final BookRepository bookRepository;
    private final BookMapper bookMapper;


    public Integer save(BookRequest request, Authentication connectedUser) {
         User user = ((User) connectedUser.getPrincipal());
        Book book = bookMapper.toBook(request);
         book.setOwner(user);
        return bookRepository.save(book).getId();
    }
    public BookResponse findById(Integer bookId) {
        return bookRepository.findById(bookId)
                .map(bookMapper::toBookResponse)
                .orElseThrow(() -> new EntityNotFoundException("No book found with ID:: " + bookId));
    }
}
