import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { fetchBookById, updateBook, addBook } from "../../api/bookService";
import "./BookForm.css";

const BookForm = () => {
    const { id } = useParams(); // Capture the book ID from the route
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        publicationDate: "",
        isbn: "",
        genre: "",
        rating: "",
        description: ""
    });

    const [isEditMode, setIsEditMode] = useState(false);

    // Load book details if editing
    useEffect(() => {
        if (id) {
            setIsEditMode(true);
            fetchBookById(id)
                .then((book) => {
                    const formattedDate = book.publicationDate ?
                        new Date(book.publicationDate).toISOString().split('T')[0] : '';
                    setFormData({
                        title: book.title || "",
                        author: book.author || "",
                        publicationDate: formattedDate,
                        isbn: book.isbn || "",
                        genre: book.genre || "",
                        rating: book.rating || "",
                        description: book.description || ""
                    });
                })
                .catch((error) => console.error("Error fetching book details:", error));
        }
    }, [id]);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isEditMode) {
                await updateBook(id, formData);
                alert("Book updated successfully!");
            } else {
                

                await addBook(formData);
                alert("Book added successfully!");

                const addAnother = window.confirm("Do you want to add another book?");
                if (addAnother) {
                    // Clear form fields for adding another book
                    setFormData({
                        title: "",
                        author: "",
                        publicationDate: "",
                        isbn: "",
                        genre: "",
                        rating: "",
                        description: ""
                    });
                } else {
                    navigate("/", { replace: true });
                    window.location.reload();
                }
            }
        } catch (error) {
            console.error("Error saving book:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">{isEditMode ? "Update Book" : "Add New Book"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="author" className="form-label">Author</label>
                    <input
                        type="text"
                        className="form-control"
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="publicationDate" className="form-label">Publication Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="publicationDate"
                        name="publicationDate"
                        value={formData.publicationDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="isbn" className="form-label">ISBN</label>
                    <input
                        type="text"
                        className="form-control"
                        id="isbn"
                        name="isbn"
                        value={formData.isbn}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="genre" className="form-label">Genre</label>
                    <select
                        className="form-select"
                        id="genre"
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Genre</option>
                        <option>Fiction</option>
                        <option>Non-Fiction</option>
                        <option>Mystery</option>
                        <option>Fantasy</option>
                        <option>Romance</option>
                        <option>Sci-Fi</option>
                        <option>Others</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="rating" className="form-label">Rating</label>
                    <input
                        type="number"
                        className="form-control"
                        id="rating"
                        name="rating"
                        step={.1}
                        value={formData.rating}
                        onChange={handleChange}
                        min="1"
                        max="5"
                        required
                    />
                </div>
                <button type="submit" className=" btn-primary">
                    {isEditMode ? "Update Book" : "Add Book"}
                </button>
                <div className="text-center mt-4">
                    <Link to="/" className="btn-secondary">
                        Back to Book List
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default BookForm;
