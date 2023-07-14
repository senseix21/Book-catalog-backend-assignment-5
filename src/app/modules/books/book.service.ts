import { object } from "zod";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { bookFilterableFields } from "./book.constants";
import { IBook, IBookFilters } from "./book.interface";
import { Book } from "./book.model";


const createBook = async (data: IBook): Promise<IBook> => {
    const result = await Book.create(data);
    return result;
};

const getBookById = async (id: string | null): Promise<IBook | null> => {
    const result = await Book.findById(id);
    return result;
};

const getAllBooks = async (filters: IBookFilters, paginationOptions: IPaginationOptions)
    : Promise<IBook[]> => {
    const { limit, page, sortBy, sortOrder, skip } = paginationHelpers.calculatePagination(paginationOptions)

    // Extract searchTerm to implement search query
    const { searchTerm, ...filtersData } = filters;

    const andConditions = [];

    //Implement search query parameters 
    if (searchTerm) {
        andConditions.push({
            $or: bookFilterableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i'
                }
            }))
        })
    };

    // Filters needs $and to fullfill all the conditions
    if (Object.keys(filtersData).length > 0) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value
            })),
        });
    };

    const result = await Book.find();
    return result;
};

const updateBook = async (id: string, data: Partial<IBook>): Promise<IBook | null> => {
    const result = await Book.findByIdAndUpdate(id, data, { new: true });
    return result;
};

const deleteBook = async (id: string): Promise<IBook | null> => {
    const result = await Book.findOneAndDelete({ _id: id }, { new: true });
    return result;
};







export const BookService = {
    createBook,
    getBookById,
    getAllBooks,
    updateBook,
    deleteBook
}