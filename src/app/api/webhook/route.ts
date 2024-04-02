import { NextResponse } from "next/server";
import Stripe from "stripe";

import { createBooking, updateHotelRoom } from "@/libs/apis";

const checkout_session_completed = 'checkout.session.completed'; 

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
   apiVersion: '2023-10-16', 
}); 

export async function POST(req: Request, res: Response) {
    const reqBody = await req.text()
    const sig = req.headers.get("stripe-signature") 
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event: Stripe.Event; 

    try {
        if(!sig || !webhookSecret) return; 
        event = stripe.webhooks.constructEvent(reqBody, sig, webhookSecret); 

    } catch(error:any){
        return new NextResponse(`Webhook Error: ${error.message}`, {status: 500}); 
    }
    // console.log(event); 
    // load our event 
    switch (event.type) {
        case checkout_session_completed: 
        const session = event.data.object; 
        console.log("session=>", session); 

        // Create a booking 
        
            const {
                //  @ts-ignore
                metadata: {
                     //  @ts-ignore
                adults,
                 //  @ts-ignore
                checkinDate, 
                 //  @ts-ignore
                checkoutDate, 
                 //  @ts-ignore
                children,
                 //  @ts-ignore
                hotelRoom,
                 //  @ts-ignore
                numberOfDays, 
                 //  @ts-ignore
                user,
                 //  @ts-ignore
                discount, 
                 //  @ts-ignore
                totalPrice
            },
        } = session; 
        await createBooking({
            adults: Number(adults),
            checkinDate,
             checkoutDate,
             children: Number(children), 
             hotelRoom, 
             numberOfDays:Number(numberOfDays), 
             discount:Number(discount), 
             totalPrice:Number(totalPrice), 
             user, 
            })
            //update hotel Room; 

           await updateHotelRoom(hotelRoom); 

         return NextResponse.json('Booking successful', {
            status:200, 
            statusText:'Booking Successul', 
        });


        default:
            console.log(`Unhandled event type ${event.type}`); 
    }

    return NextResponse.json('Event received', {
        status:200, 
        statusText:'Event Received',
    }); 
}