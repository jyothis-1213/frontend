const BASE_URL = "http://localhost:8080/api/books";

export const fetchBookById = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch book details");
    }
    return await response.json();
};

export const addBook = async (bookData) => {
    const response = await fetch(`${BASE_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
    });
    if (!response.ok) {
        throw new Error("Failed to add book");
    }
    return await response.json();
};

export const updateBook = async (id, bookData) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
    });
    if (!response.ok) {
        throw new Error("Failed to update book");
    }
    return await response.json();
};
