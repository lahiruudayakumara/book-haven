import { NextRequest, NextResponse } from 'next/server';

import Logger from '@/utils/logger';
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not defined');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-11-20.acacia',
});

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const amount = Number(formData.get('amount'));

        if (!amount) {
            return NextResponse.json({ error: 'Invalid input: Missing required fields' }, { status: 400 });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'lkr',
            payment_method_types: ['card'],
        });

        return NextResponse.json({ clientSecret: paymentIntent.client_secret }, { status: 200 });
    } catch (error) {
        Logger.error('POST /stripe ERROR: ', error);
        return NextResponse.json({ error: true }, { status: 500 });
    }
}