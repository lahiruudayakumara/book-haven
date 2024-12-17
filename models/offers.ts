import mongoose, { Document, Schema } from 'mongoose';

import { IOffer } from '@/types/offers';

const offerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    discountPercentage: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    applicableBooks: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Book',
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

const OfferModel = mongoose.models.Offers || mongoose.model<IOffer>('Offers', offerSchema);

export default OfferModel;
