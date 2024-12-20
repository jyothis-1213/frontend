// import { Route, Routes } from "react-router-dom";
// import BookForm from "./page/add-or-edit/BookForm";
// import "./App.css";
// import BookDetails from "./page/details/BookDetails";
// import Home from "./page/home/Home";

// const App = () => {
//     return (
//         <div className="app-container">
//             <header className="app-header">
//                 <h1>Book Management System</h1>
//             </header>
//             <main className="app-main">
//                 <Routes>
//                     <Route
//                         path="/"
//                         element={<Home />} />
//                     <Route path="/add-or-edit" element={<BookForm />} />
//                     <Route path="/add-or-edit/:id" element={<BookForm />} />
//                     <Route path="/details/:id" element={<BookDetails />} />
//                 </Routes>
//             </main>
//             <footer className="app-footer">
//                 <p>© 2024 Book Management System</p>
//             </footer>
//         </div>
//     );
// };

// export default App;

import { Route, Routes } from "react-router-dom";
import BookForm from "./page/add-or-edit/BookForm";
import "./App.css";
import BookDetails from "./page/details/BookDetails";
import Home from "./page/home/Home";

const App = () => {
    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Book Management System</h1>
            </header>
            <main className="app-main">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/add-or-edit" element={<BookForm />} />
                    <Route path="/add-or-edit/:id" element={<BookForm />} />
                    <Route path="/details/:id" element={<BookDetails />} />
                </Routes>
            </main>
            <footer className="app-footer">
                <p>© 2024 Book Management System</p>
            </footer>
        </div>
    );
};

export default App;

