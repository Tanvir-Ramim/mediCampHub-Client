import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Card = ({info}) => {
    const {_id,name,services,scheduled,participant,location,image,fees,audience,healthCareName}=info || {}
    return (
        <div className='col-span-1 p-3  rounded-md shadow-md group'>
             <div className='flex flex-col gap-2 w-full'>
        <div
          className='
              w-full 
              relative 
              overflow-hidden 
              rounded-xl
            '
        >
          <img
            className='
                object-cover 
                h-96 
                w-[495px] 
                group-hover:scale-110 
                transition
              '
            src={image}
            alt='Room'
          />

        </div>
        <div className='p-2 space-y-1'>
        <div className='font-semibold text-lg'>Camp Name: {name}</div>
        <div className='font-light text-neutral-500'>Venue Location: {location}</div>
        <div className='flex flex-row items-center gap-1'>
          <div >
        Specialized
Services: {services}
          </div>
        </div>
            <h1>scheduled: {scheduled}</h1>
            <div className='flex gap-5'>
                <h1>Audience : {audience}</h1>
                <h1>Fees: ${fees}</h1>
                <h1>Participant: {participant}</h1>
            </div>
            <div className='flex justify-between'>
                <h1>Healthcare Professional: {healthCareName}</h1>
                <Link to={`/details/${_id}`}> <button className="btn   btn-sm btn-outline text-[#B354A6] border-b-4 border-0">More Details</button></Link>
            </div>
        </div>
      </div>
        </div>
    );
};
Card.propTypes={
    info:PropTypes.object.isRequired
}
export default Card;