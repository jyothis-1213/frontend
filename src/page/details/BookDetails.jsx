import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BookDetails.css";

const BookDetails = () => {
    // Extract 'id' from route parameters
    const { id } = useParams();

    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                console.log(`Fetching details for book ID: ${id}`); // Debugging
                const response = await fetch(`http://localhost:8080/api/books/${id}`);
                const data = await response.json();
                setBook(data);
            } catch (error) {
                console.error("Error fetching book details:", error);
            }
        };

        fetchBookDetails();
    }, [id]);

    if (!book) return <div>Loading...</div>;

    console.log("ribin..........")
    return (
        <div className="container book-details-container mt-5">
            <h1 className="text-center mb-4">{book.title}</h1>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <table className="table table-striped table-bordered">
                        <tbody>
                            <tr>
                                <th>Author</th>
                                <td>{book.author}</td>
                            </tr>
                            <tr>
                                <th>Genre</th>
                                <td>{book.genre}</td>
                            </tr>
                            <tr>
                                <th>Publication Date</th>
                                <td>{book.publicationDate}</td>
                            </tr>
                            <tr>
                                <th>Rating</th>
                                <td>{book.rating}</td>
                            </tr>
                            <tr>
                                <th>Description</th>
                                <td>{book.description || "No description available"}</td>
                            </tr>



                        </tbody>
                    </table>
                    <div>

                        <Link to="/" className="link">
                            Back to Book List
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;
