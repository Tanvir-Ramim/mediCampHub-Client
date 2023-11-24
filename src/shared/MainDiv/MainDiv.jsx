import PropTypes from 'prop-types';

const MainDiv = ({children}) => {
    return (
        <div className="max-w-[1500px] mx-auto">
            {children}
        </div>
    );
};

MainDiv.propTypes={
     children: PropTypes.node
}
export default MainDiv;