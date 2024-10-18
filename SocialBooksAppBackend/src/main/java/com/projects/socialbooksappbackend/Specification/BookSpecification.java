package com.projects.socialbooksappbackend.Specification;

import com.projects.socialbooksappbackend.Entity.Book;
import org.springframework.data.jpa.domain.Specification;
public class BookSpecification {

    public static Specification<Book> withOwnerId(Integer ownerId) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("owner").get("id"), ownerId);
    }
}
