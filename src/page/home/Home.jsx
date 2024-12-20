import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const booksPerPage = 10;

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/books");
        const data = await response.json();
        // Sort books by title in ascending order (A-Z)
        const sortedBooks = data.sort((a, b) => a.title.localeCompare(b.title));
        setBooks(sortedBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    loadBooks();
  }, []);

  const handleDeleteBook = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/books/${id}`, {
        method: "DELETE",
      });
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  // Pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;

  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(books.length / booksPerPage);
  const changePage = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="book-list-container">
        <h2 className="text-center">Book List</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>SL NO</th>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBooks.length > 0 ? (
              currentBooks.map((book, index) => (
                <tr key={book.id}>
                  <td>{index + 1 + (currentPage - 1) * booksPerPage}</td>
                  <td>
                    <Link
                      to={`/details/${book.id}`}
                      className="book-title-link"
                    >
                      {book.title}
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteBook(book.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn-edit"
                      onClick={() => navigate(`/add-or-edit/${book.id}`)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="text-center"
                  style={{ fontSize: "30px" }}
                >
                  No books available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination-container">
        <nav>
          <ul className="pagination justify-content-center">
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => changePage(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="action-container">
        <Link to="/add-or-edit" className="btn-success">
          Add New Book
        </Link>
      </div>
    </>
  );
}
