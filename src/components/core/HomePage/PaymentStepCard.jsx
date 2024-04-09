
import React from 'react';

const PaymentStepCard = ({ borderColor, image, heading, description }) => {
//   const cardStyle = {
//     borderColor: borderColor
//   };

  return (
    <div>
      <div  className=" border-dotted border-2 text-center rounded-lg py-8 px-3 flex flex-col gap-5 justify-center items-center w-[250px] h-[400px]">
        <img src={image} loading='lazy' height={150} width={150}/>

        <h2 className="text-richblack-5 -text-xl font-semibold">{heading}</h2>

        <p className="text-sm text-richblack-200">{description}</p>
      </div>
    </div>
  );
};

export default PaymentStepCard;
