import { ObjectId } from 'mongoose';

export interface IOffer {
    [x: string]: any;
    title: string;
    description: string;
    discountPercentage: number;
    startDate: Date;
    endDate: Date;
    applicableBooks: ObjectId[];
    imageUrl: string;
    createdAt?: Date;
    updatedAt?: Date;
}
