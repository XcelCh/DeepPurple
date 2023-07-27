import React, { useState, useEffect } from 'react';

const TranscriptCard = ({ updateIsEdited, initialParagraphs, updateInitialParagraphs }) => {
    
    const [isEditable, setIsEditable] = useState(false);
    const [paragraphs, setParagraphs] = useState([]);

    useEffect(() => {
        setParagraphs([...initialParagraphs]);
    }, [initialParagraphs]);

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
                paragraph.transcriptId === paragraphId ? { ...paragraph, dialog: newContent } : paragraph
            )
        );
    };

    const handleSaveChanges = () => {
        updateIsEdited(true);
        updateInitialParagraphs([...paragraphs]);
        setIsEditable(!isEditable);

        paragraphs.forEach((paragraph) => {
            const data = {
                'transcriptId': paragraph.transcriptId,
                'recordingId': paragraph.recordingId,
                'newTranscript': paragraph.dialog
            }

            fetch ("http://localhost:8082/analysis/editTranscript", {
                method : 'POST',
                headers : {'Content-Type' : 'application/json'} ,
                body : JSON.stringify(data),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Send data failed.');
                }
                else {
                    console.log('Success sending data.');
                }
            })
            .catch (error =>  {
                console.error(error);
            })
        });
        
    };

    const timeFormat = (secs) => {
        const minutes = Math.floor(secs / 60);
        const seconds = secs % 60;

        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');
        return `[${formattedMinutes}:${formattedSeconds}]`;
    }

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
                        <p className={`font-bold ${paragraph.employeeId === 1 ? 'text-[#80F2AA]' : 'text-[#9554FE]'}`}>{paragraph.employeeName}</p>
                        <p className="text-sm text-[#83848A]">{timeFormat(paragraph.startTime)}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p key={paragraph.transcriptId} id={paragraph.transcriptId} contentEditable={isEditable} onBlur={(e) => handleParagraphChange(paragraph.transcriptId, e.target.textContent)}
                        className={`text-sm py-2 pr-4 ${isEditable ? 'bg-white border border-[#EFF0F6] rounded w-full' : ''}`}>{paragraph.dialog}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default TranscriptCard;