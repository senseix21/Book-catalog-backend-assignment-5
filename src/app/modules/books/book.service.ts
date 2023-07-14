import { IBook } from "./book.interface";
import { Book } from "./book.model";


const createBook = async (data: IBook): Promise<IBook> => {
    const result = await Book.create(data);
    return result;
}

export const BookService = {
    createBook
}