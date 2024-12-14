import mongoose, { Document, Schema } from 'mongoose';

const suscribeScema: Schema = new Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            match: [/.+@.+\..+/, 'Please enter a valid email address'],
        },
    },
    {
        timestamps: true,
    }
)

const SubscribeModel = mongoose.models.Subscribe || mongoose.model('Subscribe', suscribeScema);

export default SubscribeModel;