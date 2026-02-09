import React, { useState } from 'react';
import PricingOffers from '../Components/PricingPlan/PricingOffers';
import UpiIdModel from '../Components/models/upiIdModel';
import { useDispatch } from 'react-redux';
import { createOrderUpi } from '../redux/cashFree/cashFreeThunk';
const Plan = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const planPage = [{ planType: 'Basic', price: '500', message: ['Get started with kanban board', 'Flexible team meetings', '5 Team Leader'] },
        { planType: 'StartUp', price: '1500', message: ['All features in Basic', 'Flexible call scheduling ', '10 Team Leader'] },
        { planType: 'Enterprise', price: '10000', message: ['All features in Startup', 'Growth oriented', 'As You Want Team Leader'] }];

    const buyPlanForOrganization = ({ amount, plan }) => {
        const OrganizationInfo = JSON.parse(localStorage.getItem('createdUser'));
        const data = {
            customer_id: OrganizationInfo._id,
            customer_email: OrganizationInfo.email,
            customer_phone: OrganizationInfo.number,
            amount,
            plan
        };
        dispatch(createOrderUpi({ data, onCreateOrder }));
    };

    const onCreateOrder = () => {
        setOpen(!open);
    };

    return (<div className="font-sans bg-gray-100">
        <UpiIdModel opens={open} setOpens={setOpen}/>
        <div className="min-h-screen flex justify-center items-center">
            <div className="">
                <div className="text-center font-semibold">
                    <h1 className="text-5xl">
                        <span className="text-blue-700 tracking-wide">Flexible</span>
                        <span>Plans</span>
                    </h1>
                    <p className="pt-6 text-xl text-gray-400 font-normal w-full px-8 md:w-full">
                    Choose a plan that works best for you and<br/> your team.
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center mt-16 space-y-16 lg:flex-row lg:items-stretch lg:space-x-0 lg:space-y-1">
                    {/* eslint-disable-next-line array-callback-return */}
                    {planPage && planPage.map((offers, index) => {
                        // eslint-disable-next-line react/jsx-key
                        return (<PricingOffers offersData={offers} key={index} buyPlanForOrganization={buyPlanForOrganization}/>);
                    })}
                </div>
            </div>
        </div>
    </div>);
};
export default Plan;
