import React from 'react';
import PropTypes from 'prop-types';
// import { useNavigate } from 'react-router-dom';

const PricingOffers = ({ offersData, buyPlanForOrganization }) => {
    // const navigate = useNavigate();
    const offer = offersData;
    const startEnd = ` lg:w-96 p-8 bg-white text-center rounded-3xl shadow-xl flex flex-col w-11/12 sm:w-full ${offer.planType === 'Basic' ? 'lg:pr-16 md:pr-5' : 'lg:pl-16 md:pl-8 '}`;
    const middle = 'lg:w-80 p-8 bg-gray-900 text-center rounded-3xl text-white border-4 shadow-xl border-white w-9/12 transform scale-125 flex flex-col  sm:w-full  ';

    return (
        <div className={offer.planType === 'StartUp' ? middle : startEnd}>
            <h1 className={`font-semibold text-2xl ${offer.planType === 'StartUp' ? 'text-white' : 'text-black'}`}>{offer.planType}</h1>
            <p className="pt-2 tracking-wide">
                <span className="text-gray-400 align-top">₹ </span>
                <span className="text-2xl sm:text-3xl font-semibold">{offer.price}</span>
                <span className="text-gray-400 font-medium">/ organization</span>
            </p>
            <hr className="mt-4 border-1"/>
            <div className="pt-8">
                {offer?.message && offer.message.map((msg, index) => {
                    return (<p className="font-semibold text-gray-400 text-left pt-5 flex text-sm sm:text-lg lg:text-base" key={index}>
                        <div className="align-middle">
                            <svg className="w-6 h-6 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        </div>
                        <span className="pl-2">
                            <span className={offer.planType === 'StartUp' ? 'text-white' : 'text-black'}>{msg}</span>
                        </span>
                    </p>);
                })}
                <div className="w-full py-4 bg-blue-600 mt-8 rounded-xl text-white font-medium">
                    <button className="w-full" onClick={() => buyPlanForOrganization({ amount: offer.price, plan: offer.planType })}>
                        Choose Plan
                    </button>
                </div>
            </div>
        </div>
    );
};
export default PricingOffers;
PricingOffers.propTypes = {
  offersData: PropTypes.object,
  buyPlanForOrganization: PropTypes.func,
};
