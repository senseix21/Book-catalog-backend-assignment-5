import { IBook } from "./book.interface";
import { Book } from "./book.model";


const createBook = async (data: IBook): Promise<IBook> => {
    const result = await Book.create(data);
    return result;
};

const getBookById = async (id: string | null): Promise<IBook | null> => {
    const result = await Book.findById(id);
    return result;
};

const getAllBooks = async (): Promise<IBook[]> => {
    const result = await Book.find();
    return result;
};

const updateBook = async (id: string, data: Partial<IBook>): Promise<IBook | null> => {
    const result = await Book.findByIdAndUpdate(id, data, { new: true });
    return result;
};







export const BookService = {
    createBook,
    getBookById,
    getAllBooks,
    updateBook
}