import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/libs/auth";
import { CreateReview, checkReviewExists, getUserData, updateReview } from "@/libs/apis";

export async function GET(req:Request, res: Response){
    const session = await getServerSession(authOptions); 

   if (!session) {
    return new NextResponse('Authentication Required', {status:500}); 
   }
    const userId = session.user.id; 
    
    try {
         const data = await getUserData(userId); 
         return NextResponse.json(data, {status:200, statusText:'Successful'} ); 
    } catch(error) {
        return new NextResponse('Unable to fetch', {status:400})
    }
}

export async function POST(req: Request, res:Response ){
    const session = await getServerSession(authOptions); 

    if(!session) {
        return new NextResponse('Authentication is required', {status:500}); 
    }

  const {roomId, reviewText, ratingValue } = await req.json(); 
  //cfr review schema; 
  if (!roomId || !reviewText || !ratingValue) {
    return new NextResponse('All fields are required', { status:400 }); 
  }

  const userId = session.user.id;
  
  try {
    //check if review already exists
    const alreadyExists = await checkReviewExists(userId, roomId); 

    // console.log("alreadyExists", alreadyExists); 
     let data; 

     if(alreadyExists){
         data = await updateReview({
            reviewId:alreadyExists._id,
            reviewText,
            userRating:ratingValue, 
         }); 
     } else {
        data = await CreateReview({
            hotelRoomId:roomId,
            reviewText,
            userId,
            userRating: ratingValue,
        }); 
     }

     return NextResponse.json(data, {status:200, statusText:'successful'}, )
  } catch(error: any){
    console.log("Error Updating", error)
    return new NextResponse('Unable to create a review', { status:400 }) 
  }
}