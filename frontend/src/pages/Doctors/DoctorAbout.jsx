import React from 'react'
import { formateDate } from '../../utils/formateDate'
const DoctorAbout = ({name,description,specialization, additional_details, phone,email,image}) => {
  return (
    <div>
        <div>
            <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2'>About of
            <span className='text-irisBlueColor font-bold text-[24px] leading-9'>
                {name}
            </span>
            </h3>
            <p className='text__Para'>
                {description}
            </p>
        </div>
        <div className='mt-12'>
        <h3 className=' text-[20px] leading-[30px] text-headingColor font-semibold'>
            Current Working Hospital
            </h3>
            <p className='text__Para'>
                {additional_details.current_working_hospital}
            </p>
            <h3 className=' text-[20px] leading-[30px] text-headingColor font-semibold'>
            Educations
            </h3>
            <ul className='pt-4 md:p-5'>
                <li className='flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]'>
                    <div>
                        <span className='text-irisBlueColor text-[15px] leading-6 font-semibold'>
                            {formateDate("10-04-2010")} - {formateDate("02-04-2010")}
                        </span>
                        <p className='text-[15px] leading-6 font-medium text-textColor'>{additional_details.education}</p>
                    </div>
                    <p className='text-[14px] leading-5 font-medium text-textColor'>Appolo Hospital New Delhi.</p>
                </li>
                <li className='flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]'>
                    <div>
                        <span className='text-irisBlueColor text-[15px] leading-6 font-semibold'>
                            {formateDate("12-04-2010")} - {formateDate("04-04-2010")}
                        </span>
                        <p className='text-[16px] leading-6 font-medium text-textColor'>PHD in Surgeon</p>
                    </div>
                    <p className='text-[14px] leading-5 font-medium text-textColor'>Appolo Hospital New Delhi.</p>
                </li>
            </ul>
        </div>

        <div className='mt-12'>
            <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>
                Experience ({additional_details.experience} year )
            </h3>


            <ul className='grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5'>
                <li className='p-4 rounded bg-[#fff9ea]'>
                    <span className='text-yellowColor text-[15px] leading-6 font-semibold'>
                        {formateDate("12-04-2010")} - {formateDate("04-04-2010")}
                    </span>
                    <p className='text-[16px] leading-6 font-medium text-textColor'>Sr.Surgeon</p>
                    <p className='text-[14px] leading-5 font-medium text-textColor'>Appolo Hospital New Delhi.</p>

                </li>

                <li className='p-4 rounded bg-[#fff9ea]'>
                    <span className='text-yellowColor text-[15px] leading-6 font-semibold'>
                        {formateDate("12-04-2010")} - {formateDate("04-04-2010")}
                    </span>
                    <p className='text-[16px] leading-6 font-medium text-textColor'>Sr.Surgeon</p>
                    <p className='text-[14px] leading-5 font-medium text-textColor'>Appolo Hospital New Delhi.</p>

                </li>
            </ul>

        </div>
    </div>
  )
}

export default DoctorAbout




