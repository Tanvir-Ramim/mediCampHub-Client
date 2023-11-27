import { motion } from "framer-motion";

const StayHealthy = () => {
    return (
        < div className="grid lg:grid-cols-2 items-center  lg:mt-24 md:mt-16 mt-10    max-w-[1350px] md:p-0 p-3   m-auto ">
        <motion.div  animate={{
        scale: [1, 2, 2, 1, 1],
        rotate: [0, 0, 180, 180, 0],
        borderRadius: ["0%", "0%", "50%", "50%", "0%"]
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: 0.3,
        repeatDelay: 1
      }} className=" flex justify-center lg:justify-start"    >
         <img  className="w-11/12 rounded-lg" src="https://i.ibb.co/DgvY4DX/doctor-nurses-special-equipment.jpg" alt="" />
        </motion.div>
        
        <div className=" flex flex-col lg:items-start items-center lg:text-left text-center " >
         <h1 className="text-5xl font-semibold"> Always Stay  <span className="text-[#B354A6]"> Healthy</span> </h1>
         <p className="md:mt-4 md:p-0 p-1 mt-4 font-medium lg:mb-8 bt-5 ">Maintaining optimal health is a holistic commitment that transcends mere physical well-being; it encompasses a dynamic equilibrium of physical, mental, and social dimensions. The tapestry of a healthy lifestyle is woven with threads of balanced nutrition, regular exercise, sufficient sleep, and stress management. Nurturing ones physical health involves not only fueling the body with nutrient-rich foods but also engaging in regular physical activity that promotes cardiovascular fitness, muscular strength, and flexibility. Adequate rest is equally imperative, as it allows the body to rejuvenate and repair, fortifying its resilience against the demands of daily life. Concurrently, safeguarding mental health is indispensable, demanding mindfulness, self-reflection, and the cultivation of coping mechanisms to navigate the intricacies of a fast-paced world. Social health, too, plays a pivotal role, as meaningful connections and a supportive network foster emotional well-being. Embracing preventative measures, such as vaccinations and routine health check-ups, empowers individuals to take charge of their well-being proactively. The tapestry of lifelong health is thus woven through a conscientious interplay of physical, mental, and social elements, urging individuals to prioritize self-care as an enduring investment in their overall vitality and longevity.
         
Optimal health is an intricate mosaic woven from a multifaceted tapestry of practices, ideologies, and commitments that collectively transcend the mere absence of illness. It extends far beyond the realm of physicality.</p>
        </div>
     </div>
    );
};

export default StayHealthy;