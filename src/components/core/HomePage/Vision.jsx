import React from 'react'

const Vision = () => {
  return (
    <div>
     
        <div>
            <div className='w-11/12 md:w-9/12 mx-auto flex flex-col md:flex-row items-center justify-center gap-16 md:gap-10 text-white my-28 md:my-40'>
                {/* card 1 */}
                <div className='w-200px border-[1px] border-richblack-700 rotate-12 md:-mr-16 bg-richblack-900'>
                    <div className='h-16 flex items-center px-5 bg-indigo font-semibold text-black'>
                        नियम - 1
                    </div>
                    <div className='p-5'>
                    इस योजना में जमा हुए फंड का उपयोग Emergency कार्यो (स्वास्थ्य सम्बंधी) में किया जाएगा। इसमे से उस व्यक्ति को फंड का केवल 30% ही दिया जावेगा ।
                    </div>
                </div>

                {/* card 2 */}
                <div className='w-200px border-[1px] border-richblack-700 z-10 bg-richblack-900 -rotate-3'>
                    <div className='h-16 flex items-center px-5 bg-rose font-semibold text-black'>
                        नियम - 2
                    </div>
                    <div className='p-5'>
                    इस योजना में पैसे जमा करने के लिए हर महीने की 1 से 5 तारीख चुनी गई है। अगर कोई व्यक्ति इन 5 दिनों में पैसे जमा नही करता है तो उस व्यक्ति को ग्रुप से हटा दिया जाएगा।
                    </div>
                </div>


                {/* card 3 */}
                <div className='w-200px border-[1px] border-richblack-700  rotate-12 bg-richblack-900 md:-ml-10'>
                    <div className='h-16 flex items-center px-5 bg-yellow-5 font-semibold text-black'>
                        नियम - 3
                    </div>
                    <div className='p-5'>
                    अगर कोई व्यक्ति इस योजना को बंद करना चाहे तो उस व्यक्ति को उसके द्वारा जमा की गई कुल राशि मे से कुछ भी वापस नही किया जाएगा ।
                    </div>
                </div>

            </div>
        </div>

    </div>
  )
}

export default Vision
