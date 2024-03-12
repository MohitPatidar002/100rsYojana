import React, { useState, useEffect } from 'react'
import { apiConnector } from '../services/apiConnector';
import { getAllUser } from '../services/apis';
import { FaCheck } from "react-icons/fa";
import * as XLSX from 'xlsx';


const PaidUser = () => {

    const [paidUser, setPaidUser] = useState([]);
    

    async function fetchData(){
        try{
            const response = await apiConnector("GET", getAllUser.GET_ALL_USER_DETAIL_API)
            //   console.log("get user detail", response)
            const data = response.data.allUser;
            //   console.log(data)
            
            const paidUserData = data.filter((user) => user.payment.paymentStatus === true);
                
            setPaidUser(paidUserData);
              
          
        }
        catch(error){
            console.log("error while fetching user data from backend")
        }
      }
    //   console.log("paid user", paidUser)

    useEffect(()=> {
        fetchData();
    },[])


    // get current month
    const currentDate = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    const currentMonth = monthNames[currentDate.getMonth()];
    const currentYear = currentDate.getFullYear();
    
    const exportToExcel = () => {
        const filteredPaidMembers = paidUser.map(user => {
            // Parse updatedAt date string to Date object
            const updatedAtDate = new Date(user.payment?.updatedAt);
            
            // Extract day, month, and year
            const day = updatedAtDate.getDate();
            const month = updatedAtDate.getMonth() + 1; // Adding 1 because months are zero-indexed
            const year = updatedAtDate.getFullYear();
            
            // Extract hours, minutes, and AM/PM
            let hours = updatedAtDate.getHours();
            const minutes = updatedAtDate.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours %= 12;
            hours = hours || 12; // Handle 0 hours as 12 AM
            
            // Format day, month, year, hours, and minutes with leading zeros if needed
            const formattedDay = day < 10 ? '0' + day : day;
            const formattedMonth = month < 10 ? '0' + month : month;
            const formattedHours = hours < 10 ? '0' + hours : hours;
            const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
            
            // Format the date and time string
            const formattedPayDate = `${formattedDay}/${formattedMonth}/${year} ${formattedHours}:${formattedMinutes} ${ampm}`;
            
            return {
                Name: user.name,
                Amount: 100,
                Pay_Date: formattedPayDate,
            };
        });
        
        const workbook = XLSX.utils.book_new();
        const paidSheet = XLSX.utils.json_to_sheet(filteredPaidMembers);
    
        const centerStyle = { alignment: { horizontal: 'center' } };

        // Add headers to the paidSheet
        XLSX.utils.sheet_add_json(paidSheet, [{ Name: 'Name', Amount: 'Amount', Pay_Date: 'Pay_Date' }], {
          skipHeader: true,
          origin: 'A1'
        });
    
        // Apply center alignment to all cells in the paidSheet
        Object.keys(paidSheet).forEach(key => {
          if (key !== '!ref') {
            paidSheet[key].s = centerStyle;
          }
        });
        
        XLSX.utils.book_append_sheet(workbook, paidSheet, 'Paid Members');
     
    
        XLSX.writeFile(workbook, `${currentMonth} ${currentYear}.xlsx`);
      };

  return (
    <div>
        <div className='w-11/12 md:w-6/12 mx-auto justify-center mt-10 overflow-hidden mb-12'>

            <div className='flex justify-between items-center mb-10'>
                <h1 className='text-3xl text-richblack-5 font-semibold '>Paid Member</h1>

                <button onClick={exportToExcel}
                className='text-richblack-900 bg-yellow-50 text-sm  font-semibold flex gap-1 md:gap-3 items-center px-2 py-1 md:px-4 md:py-2 rounded-md'>
                Export to Excel
                </button>
            </div>
            

            <div className='flex flex-col gap-3'>
                {
                    paidUser.length > 0 
                    ? (
                        paidUser.map((user, index) =>  {
                            return (

                                <div className='text-white bg-richblack-800 px-5 py-2 rounded-md flex justify-between items-center' key={index}>
                                    <div className='flex gap-2 items-center'>
                                        <img src={user.image} className='rounded-full' alt='profileImageUser' width={50} height={50}/>
                                        <p>{user.name}</p>
                                    </div>
                                    <div className='flex gap-1 items-center'>
                                        <p>Paid</p>
                                        <FaCheck className=' bg-green text-white text-lg p-[1px] rounded-sm'/>
                                    </div>
                                </div>

                                /* <div className='bg-richblack-800 px-5 py-3 rounded-md  text-richblack-25 flex justify-between items-center gap-5' 
                                key={index}>
                                
                                    <div className='flex items-center gap-2 md:gap-4'>
                                        <img src={user.image} className='w-[30%] aspect-square  
                                        rounded-full' alt='profileImageUser' loading='lazy'/>
                                        <p>{user.name}</p>
                                    </div>
                                    <div className='flex gap-1 items-center'>
                                        <p>Paid</p>
                                        <FaCheck className=' bg-green text-white '/>
                                    </div>
                                
                                </div>    */
                            )
                        })
                        
                        )
                    : (
                        <div className='text-richblack-25 text-center mt-[170px]'>No one pay till now</div>
                    )
                }
            </div>

            

        </div>
    </div>
  )
}

export default PaidUser
