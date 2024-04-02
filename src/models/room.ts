// all types properties are coming from inspecting our sanity created rooms; 

type CoverImage = {
    url: string; 
};

export type Image = {
    _key: string;
    url:string;  
}; 

type Amenity = {
    _key: string; 
    amenity: string; 
    icon: string; 
}

type Slug = {
    _type:string;
    current: string;
    specialNote: string;   

};

export type Room = {
    _id: string; 
    coverImage: CoverImage, 
    description: string, 
    dimension: string, 
    discount: number, 
    images: Image[], 
    isBooked: boolean; 
    isFeatured: boolean; 
    name: string; 
    numberOfBeds:number; 
    offeredAmenities: Amenity[]; 
    price: number; 
    slug: Slug; 
    specialNote:string; 
    type: string; 
}; 

export type CreateBookingDto = {
  user: string; 
  hotelRoom:string; 
  checkinDate: string; 
  checkoutDate: string; 
  numberOfDays: number; 
  adults: number; 
  children: number; 
  totalPrice: number; 
  discount: number; 
}