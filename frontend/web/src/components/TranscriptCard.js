import React, { useState, useEffect } from 'react';
import { BASE_URL } from "../pages/config";

const TranscriptCard = ({ initialParagraphs, employeeName }) => {
    
    const [paragraphs, setParagraphs] = useState([]);

    useEffect(() => {
        setParagraphs([...initialParagraphs]);
    }, [initialParagraphs]);

    const timeFormat = (secs) => {
        const minutes = Math.floor(secs / 60);
        const seconds = secs % 60;

        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = Math.ceil(seconds).toString().padStart(2, '0');
        return `[${formattedMinutes}:${formattedSeconds}]`;
    }

  return (
    <div>
        <div className="flex items-center justify-between">
            <p className="text-xl font-bold">Recording Transcript</p>
        </div>
          <div className="space-y-2 overflow-y-scroll h-96 pr-4">
            {paragraphs.map((paragraph) => (
                <div className="mt-2 border border-[#EFF0F6] rounded-lg p-2 bg-[#FAFAFA]">
                    <div className="flex items-center justify-between">
                        {paragraph[0] == true ?
                            (
                                <p className="font-bold text-[#80F2AA]">{employeeName}</p>)
                            : (
                                <p className="font-bold text-[#9554FE]">Customer</p>)}
                            
                        <p className="text-sm text-[#83848A]">{timeFormat(paragraph[2])}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-sm py-2 pr-4">{paragraph[1]}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default TranscriptCard;