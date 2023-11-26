import { Helmet } from "react-helmet-async";
import Banner from "../../components/Banner/Banner";
import PopularCamps from "../../components/PopularrCamps/PopularCamps";




const Home = () => {
    return (
        <div>
           <Helmet><title>MCH | Home</title></Helmet>
           <Banner></Banner>
           <PopularCamps></PopularCamps>
        </div>
    );
};

export default Home;