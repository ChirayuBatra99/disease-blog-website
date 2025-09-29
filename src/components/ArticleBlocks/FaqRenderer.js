import React from 'react'

export default function FaqRenderer({ faq }) {
    return (
        <div>
            {faq.map((f, index) => {
                return (
                    <div key={index} className="border border-gray-400 rounded-xl p-5 mt-10">
                        <span key={index} className='font-semibold'>Question: {f.question}</span>
                        <div className="w-full h-[1px] bg-gray-300"></div>
                        <br />
                        <span key={index}>Answer:{f.answer}</span>
                    </div>
                )
            })}   
        </div>
    )
}

