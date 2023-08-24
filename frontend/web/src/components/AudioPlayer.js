import React, { useState, useRef, useEffect } from "react";
import { Forward, Backward } from "../assets/index";
import styles from "../styles/AudioPlayer.module.css";
import authHeader from "../services/auth-header";
import { BASE_URL } from "../pages/config";
import { Loading } from "../assets/index";

function AudioPlayer({
  initialParagraphs,
  employeeName,
  recordingName,
  timeStamp,
}) {
  // state
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // references
  const audioPlayer = useRef(); // reference audio component
  const progressBar = useRef(); // reference to progress bar
  const animationRef = useRef(); // reference the animation

  //load audio recording's duration info
  const onLoadedMetadata = () => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  };

  //format time based on seconds
  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  //toggle recording's play and pause
  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  //animate audio player's duration during play
  const whilePlaying = () => {
    if(audioPlayer.current != null) {
      progressBar.current.value = audioPlayer.current.currentTime;
      changePlayerCurrentTime();
      animationRef.current = requestAnimationFrame(whilePlaying);
    }
  };

  //make range dynamic
  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  };
 
  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(progressBar.current.value / duration) * 100}%`
    );
    setCurrentTime(progressBar.current.value);
  };

  const backTen = () => {
    progressBar.current.value = Number(progressBar.current.value) - 10;
    changeRange();
  };

  const forwardTen = () => {
    progressBar.current.value = Number(progressBar.current.value) + 10;
    changeRange();
  };

  //fetch audio from backend
  const token = authHeader();
  useEffect(() => {
    const audioSrc = `${BASE_URL}/audio/download/${timeStamp}_${recordingName}`;

    fetch(audioSrc, {
      headers: token,
    })
      .then((response) => response.blob())
      .then((audioBlob) => {
        const audioUrl = URL.createObjectURL(audioBlob);
        audioPlayer.current.src = audioUrl;
      })
      .catch((error) => {
        console.error("Error fetching audio:", error);
      });
  }, [timeStamp, recordingName]);


  return (
    <div className={styles.audioPlayer}>
      <div className="flex items-center">
        {timeStamp && (
          <audio
            ref={audioPlayer}
            // src={`http://localhost:8082/audio/download/${timeStamp}_${recordingName}`}
            preload="metadata"
            onLoadedMetadata={onLoadedMetadata}
          ></audio>
        )}

        {/* current time */}
        {audioPlayer.current && audioPlayer.current.duration ? (
          <div className="mr-2">{calculateTime(currentTime)}</div>
        ) : (
          <div></div>
        )}

        {/* progress bar */}
        <div className="flex-1">
          <input
            type="range"
            className={`${styles.progressBar} ${progressBar.current && progressBar.current.max > 0 ? '' : 'hidden'}`}
            defaultValue="0"
            ref={progressBar}
            onChange={changeRange}
          ></input>
        </div>

        {/* duration */}
        {audioPlayer.current && audioPlayer.current.duration ? (
          <div className="ml-2">
            {duration && !isNaN(duration) && calculateTime(duration)}
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div>
        {audioPlayer.current && audioPlayer.current.duration ? (
          <div className="flex justify-center mt-4">
            <button className={`mr-6 ${styles.forwardBackward}`} onClick={backTen}>
              <img src={Backward} />
            </button>
            <button onClick={togglePlayPause} className={styles.playPause}>
              {isPlaying ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-10 h-10"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z"
                    clip-rule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-10 h-10"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                    clip-rule="evenodd"
                  />
                </svg>
              )}
            </button>
            <button
              className={`ml-6 ${styles.forwardBackward}`}
              onClick={forwardTen}
            >
              <img src={Forward} />
            </button>
          </div>
        ) : (
          <div className="card-body h-32">
            <img
              src={Loading}
              className="h-16 animate-spin my-auto"
            ></img>
          </div>
        )}
      </div>
      <div>
        {audioPlayer.current && audioPlayer.current.duration ? (
        <div class="relative mx-12 pt-1">
          <div class="mb-2">
            <p className="font-bold text-[#80F2AA]">{employeeName}</p>
          </div>
          <div class="mb-4 flex h-2 overflow-hidden rounded bg-[#F5F5F5] text-xs">
            {initialParagraphs.map((paragraph, index) => {
              const startTime = paragraph[2];
              const endTime = paragraph[3];
              let prevEndTime;
              let gapToPrevEndTime;
              
              if (index > 0) {
                prevEndTime = initialParagraphs[index - 1][3];
                gapToPrevEndTime = startTime - prevEndTime;
              }
              if(index == 0) {
                return (
                  <React.Fragment>
                    <div
                      style={{ width: `${(startTime / duration) * 100}%`}}
                      class="bg-[#F5F5F5] transition-all duration-500 ease-out"
                    ></div>
                    <div
                      style={{ width: `${((endTime - startTime) / duration) * 100}%`}}
                      class="bg-[#80F2AA] transition-all duration-500 ease-out"
                    ></div>
                  </React.Fragment>
                );
              }
              if(index == initialParagraphs.length - 1) {
                if(paragraph[0]) {
                  return (
                    <React.Fragment>
                      <div
                        style={{ width: `${((gapToPrevEndTime) / duration) * 100}%`}}
                        class="bg-[#F5F5F5] transition-all duration-500 ease-out"
                      ></div>
                      <div
                        style={{ width: `${((endTime - startTime) / duration) * 100}%`}}
                        class="bg-[#80F2AA] transition-all duration-500 ease-out"
                      ></div>
                      <div
                        style={{ width: `${((duration - endTime) / duration) * 100}%`}}
                        class="bg-[#F5F5F5] transition-all duration-500 ease-out"
                      ></div>
                    </React.Fragment>
                  );
                } else {
                  return (
                    <React.Fragment>
                      <div
                        style={{ width: `${((gapToPrevEndTime) / duration) * 100}%`}}
                        class="bg-[#F5F5F5] transition-all duration-500 ease-out"
                      ></div>
                      <div
                        style={{ width: `${((endTime - startTime) / duration) * 100}%`}}
                        class="bg-[#F5F5F5] transition-all duration-500 ease-out"
                      ></div>
                      <div
                        style={{ width: `${((duration - endTime) / duration) * 100}%`}}
                        class="bg-[#F5F5F5] transition-all duration-500 ease-out"
                      ></div>
                    </React.Fragment>
                  );
                }
              }
              if(paragraph[0]) {
                return (
                  <React.Fragment>
                    <div
                      style={{ width: `${(gapToPrevEndTime / duration) * 100}%`}}
                      class="bg-[#F5F5F5] transition-all duration-500 ease-out"
                    ></div>
                    <div
                      style={{ width: `${((endTime - startTime) / duration) * 100}%`}}
                      class="bg-[#80F2AA] transition-all duration-500 ease-out"
                    ></div>
                  </React.Fragment>
                );
              } else {
                return (
                  <div
                    style={{ width: `${((endTime - startTime + gapToPrevEndTime) / duration) * 100}%`}}
                    class="bg-[#F5F5F5] transition-all duration-500 ease-out"
                  ></div>
                );
              }
            })}
          </div>
          <div class="mb-2">
            <p className="font-bold text-[#9554FE]">Customer</p>
          </div>
          <div class="mb-4 flex h-2 overflow-hidden rounded bg-[#F5F5F5] text-xs">
            {initialParagraphs.map((paragraph, index) => {
                const startTime = paragraph[2];
                const endTime = paragraph[3];
                let prevEndTime;
                let gapToPrevEndTime;
                
                if (index > 0) {
                  prevEndTime = initialParagraphs[index - 1][3];
                  gapToPrevEndTime = startTime - prevEndTime;
                }
                if(index == 0) {
                  return (
                    <React.Fragment>
                      <div
                        style={{ width: `${(startTime / duration) * 100}%`}}
                        class="bg-[#F5F5F5] transition-all duration-500 ease-out"
                      ></div>
                      <div
                        style={{ width: `${((endTime - startTime) / duration) * 100}%`}}
                        class="bg-[#F5F5F5] transition-all duration-500 ease-out"
                      ></div>
                    </React.Fragment>
                  );
                }
                if(index == initialParagraphs.length - 1) {
                  if(paragraph[0]) {
                    return (
                      <React.Fragment>
                        <div
                          style={{ width: `${((gapToPrevEndTime) / duration) * 100}%`}}
                          class="bg-[#F5F5F5] transition-all duration-500 ease-out"
                        ></div>
                        <div
                          style={{ width: `${((endTime - startTime) / duration) * 100}%`}}
                          class="bg-[#F5F5F5] transition-all duration-500 ease-out"
                        ></div>
                        <div
                          style={{ width: `${((duration - endTime) / duration) * 100}%`}}
                          class="bg-[#F5F5F5] transition-all duration-500 ease-out"
                        ></div>
                      </React.Fragment>
                    );
                  } else {
                    return (
                      <React.Fragment>
                        <div
                          style={{ width: `${((gapToPrevEndTime) / duration) * 100}%`}}
                          class="bg-[#F5F5F5] transition-all duration-500 ease-out"
                        ></div>
                        <div
                          style={{ width: `${((endTime - startTime) / duration) * 100}%`}}
                          class="bg-[#9554FE] transition-all duration-500 ease-out"
                        ></div>
                        <div
                          style={{ width: `${((duration - endTime) / duration) * 100}%`}}
                          class="bg-[#F5F5F5] transition-all duration-500 ease-out"
                        ></div>
                      </React.Fragment>
                    );
                  }
                }
                if(paragraph[0]) {
                  return (
                      <div
                        style={{ width: `${((endTime - startTime + gapToPrevEndTime) / duration) * 100}%`}}
                        class="bg-[#F5F5F5] transition-all duration-500 ease-out"
                      ></div>
                  );
                } else {
                  return (
                    <React.Fragment>
                      <div
                        style={{ width: `${(gapToPrevEndTime / duration) * 100}%`}}
                        class="bg-[#F5F5F5] transition-all duration-500 ease-out"
                      ></div>
                      <div
                        style={{ width: `${((endTime - startTime) / duration) * 100}%`}}
                        class="bg-[#9554FE] transition-all duration-500 ease-out"
                      ></div>
                    </React.Fragment>
                  );
                }
              })}
          </div>
        </div>
        ) : (
          <div></div>
        )}
      </div>

    </div>
  );
}

export { AudioPlayer };
