import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { bookSearchableFields } from "./book.constants";
import { IBook, IBookFilters } from "./book.interface";
import { Book } from "./book.model";
import { SortOrder } from "mongoose";
import { IGenericResponse } from "../../../interfaces/common";

//Create a new book
const createBook = async (data: IBook): Promise<IBook> => {
    const result = await Book.create(data);
    return result;
};

//get a single book
const getBookById = async (id: string | null): Promise<IBook | null> => {
    const result = await Book.findById(id);
    return result;
};

//Get all books with search and filter conditions
const getAllBooks = async (filters: IBookFilters, paginationOptions: IPaginationOptions)
    : Promise<IGenericResponse<IBook[]>> => {
    const { limit, page, sortBy, sortOrder, skip } = paginationHelpers.calculatePagination(paginationOptions)

    // Extract searchTerm to implement search query
    const { searchTerm, ...filtersData } = filters;

    const andConditions = [];

    //Implement search query parameters 
    if (searchTerm) {
        andConditions.push({
            $or: bookSearchableFields.map(field => ({
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

    // Dynamic  Sort needs  field to  do sorting
    const sortConditions: { [key: string]: SortOrder } = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }

    // If there is no condition , put {} to give all data
    const whereConditions =
        andConditions.length > 0 ? { $and: andConditions } : {};

    const result = await Book.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)

    const total = await Book.countDocuments(whereConditions);

    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };
};

//Updata the book
const updateBook = async (id: string, data: Partial<IBook>): Promise<IBook | null> => {
    const result = await Book.findByIdAndUpdate(id, data, { new: true });
    return result;
};

//Delete the book
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