import { Helmet } from "react-helmet-async";
import Banner from "../../components/Banner/Banner";
import PopularCamps from "../../components/PopularrCamps/PopularCamps";
import StayHealthy from "../../components/stayhealthy/stayHealthy";
import TopHP from "../../components/topHP/TopHP";
import Testimonials from "./testimonials/Testimonials";




const Home = () => {
    return (
        <div>
           <Helmet><title>MCH | Home</title></Helmet>
           <Banner></Banner>
           <PopularCamps></PopularCamps>
           <StayHealthy></StayHealthy>
           <TopHP></TopHP>
           <Testimonials></Testimonials>
        </div>
    );
};

export default Home;