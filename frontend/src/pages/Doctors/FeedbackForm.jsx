import React, { useState } from 'react'
import { AiFillStar } from 'react-icons/ai';
import Cookies from 'js-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {baseUrl} from '../../utils/Constants';
const FeedbackForm = () => {
    const [rating,setRating]=useState(1);
    const [hover,setHover]=useState(0);
    const [reviewText, setReviewText]=useState('');

    const userId=Cookies.get("id")
    const {id}  = useParams();
    const navigate = useNavigate()
    // const doctorIdInt = parseInt(doctorId, 10);
    console.log("userid, doctor id", userId )
    console.log("doctor id", id )
    console.log("urllll",`${baseUrl}submit-feedback/${userId}/`)
    const handleSubmitReview = async (e) =>{
        e.preventDefault();
        const feedbackData = {
            user: parseInt(userId, 10),
            doctor: parseInt(id, 10),
            rating: rating,
            review_text: reviewText,
        };
        console.log({feedbackData})

        try {
            
            const response = await axios.post(`${baseUrl}submit-feedback/`, feedbackData);

            if (response.status===201) {
                navigate("/feedback");
                // Handle success, maybe show a success message
                console.log('Feedback submitted successfully');
            } else {
                // Handle error, maybe show an error message
                console.error('Failed to submit feedback');
            }
        } catch (error) {
            console.error('Error submitting feedback:', error.message || error);
        }
    }
  return (
    <form onSubmit={handleSubmitReview}>
        <div>
            <h3 className='text-headingColor txt-[16px] leading-6 font-semibold mb-4 mt-0'>
                How would you rate the overall experience ?
            </h3>

            <div>
                {[...Array(5).keys()].map((_,index)=>{
                    index+=1;

                    return (
                        <button key={index} 
                                type='button'
                                className={`${
                                    index <=((rating && hover) || hover)
                                    ? 'text-yellowColor'
                                    : 'text-gray-400'}
                                    bg-transparent border-none outline-none text-[22px] cursor-pointer`}
                                onClick={()=>setRating(index)}
                                onMouseEnter={()=> setHover(index)}
                                onMouseLeave={()=> setHover(rating)}
                                onDoubleClick={()=>{
                                    setHover(0);
                                    setRating(0)
                                }}
                        >
                            <span>
                                <AiFillStar />
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>

        <div className='mt-[30px]'>
        <h3 className='text-headingColor txt-[16px] leading-6 font-semibold mb-4 mt-0'>
                Share your feedback or suggestions
            </h3>

            <textarea className='border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md'  
                rows='5' 
                placeholder='Write your message'
                onChange={(e) => setReviewText(e.target.value)}
                value={reviewText} 
            ></textarea>
        </div>

        <button type='submit' onClick={handleSubmitReview} className='btn'>Submit Feedback</button>
    </form>
  )
}

export default FeedbackForm