import FeaturedRoom from "@/components/FeaturedRoom/FeaturedRoom";
import Gallery from "@/components/Gallery/Gallery";
import HeroSection from "@/components/HeroSection/HeroSection";
import NewsLetter from "@/components/NewsLetter/NewsLetter";
import PageSearch from "@/components/PageSearch/PageSearch";
import { getFeaturedRoom } from "@/libs/apis";


 const Home= async()=>{
    const featuredRoom = await getFeaturedRoom(); 

    // throw new Error("Unable to fetch"); 

    // console.log(featuredRoom); 
  return (
  <>
  <HeroSection /> 
   {/* PAGE SEARCH */}
   <PageSearch /> 
   {/* Featured Room */}
   <FeaturedRoom featuredRoom={featuredRoom} /> 
   {/* Gallery */}
   <Gallery /> 
   {/* News Letter  */}
   <NewsLetter /> 
  </>
  );
 };


export default Home; 