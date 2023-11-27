import PropTypes from 'prop-types';


const SectionTitle = ({ heading, subHeading }) => {
    return (
        <div className="w-2/3 mx-auto text-center">
            <h2 className="uppercase text-xl py-2">  {heading}</h2>
            <p className="text-blue-600 mb-3 text-sm"> ---{subHeading}---</p>
        </div>
    );
};

export default SectionTitle;

SectionTitle.propTypes = {
    heading: PropTypes.string,
    subHeading: PropTypes.string,
}