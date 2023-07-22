import React, { useState } from 'react';

const TranscriptCard = ({ isEdited, updateIsEdited, initialParagraphs }) => {
    
    const [isEditable, setIsEditable] = useState(false);
    const [paragraphs, setParagraphs] = useState([...initialParagraphs]);

    const handleEditClick = () => {
        setIsEditable(!isEditable);
    };

    const handleCancelChanges = () => {
        setParagraphs([...initialParagraphs]);
        setIsEditable(!isEditable);
    };

    const handleParagraphChange = (paragraphId, newContent) => {
        setParagraphs((prevEditedParagraphs) =>
            prevEditedParagraphs.map((paragraph) =>
                paragraph.id === paragraphId ? { ...paragraph, sentence: newContent } : paragraph
            )
        );
    };

    const handleSaveChanges = () => {
        updateIsEdited(true);
        initialParagraphs = [...paragraphs];
        setIsEditable(!isEditable);
    };


  return (
    <div>
        <div className="flex items-center justify-between">
            <p className="text-xl font-bold">Recording Transcript</p>
            {isEditable ? (
                <div>
                    <button className="mr-2 inline-flex px-4 py-2 text-white bg-[#3C3988] rounded-lg hover:bg-[#351D4F] focus:outline-none focus:ring-blue-300" onClick={handleCancelChanges}>
                        Cancel
                    </button>
                    <button className="inline-flex px-4 py-2 text-white bg-[#3C3988] rounded-lg hover:bg-[#351D4F] focus:outline-none focus:ring-blue-300" onClick={handleSaveChanges}>
                        Save
                    </button>
                </div>
            ) : (
                <button className="inline-flex px-4 py-2 text-white bg-[#3C3988] rounded-lg hover:bg-[#351D4F] focus:outline-none focus:ring-blue-300" onClick={handleEditClick}>
                    Edit
                </button>
            )}
        </div>
        <div className="space-y-2 overflow-y-scroll h-96 pr-4">
            {paragraphs.map((paragraph) => (
                <div className="mt-2 border border-[#EFF0F6] rounded-lg p-2 bg-[#FAFAFA]">
                    <div className="flex items-center justify-between">
                        <p className={`font-bold ${paragraph.role === 'Agent' ? 'text-[#80F2AA]' : 'text-[#9554FE]'}`}>{paragraph.speaker}</p>
                        <p className="text-sm text-[#83848A]">[{paragraph.startTime}]</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p key={paragraph.id} id={paragraph.id} contentEditable={isEditable} onBlur={(e) => handleParagraphChange(paragraph.id, e.target.textContent)}
                        className={`text-sm py-2 pr-4 ${isEditable ? 'bg-white border border-[#EFF0F6] rounded w-full' : ''}`}>{paragraph.sentence}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default TranscriptCard;