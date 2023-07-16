import { Model } from "mongoose"

export type IReview = {
    review: string
}

export type ReviewModel = Model<IReview, Record<string, unknown>>