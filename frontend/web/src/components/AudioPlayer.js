import React, { useState, useRef, useEffect } from "react";
import { Forward, Backward } from "../assets/index";
import styles from "../styles/AudioPlayer.module.css";

function AudioPlayer({ initialParagraphs, employeeName, recordingName }) {

    useEffect(() => {
        console.log("RECORDING NAME: " + recordingName);
    }, [recordingName]);

  // state
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // references
  const audioPlayer = useRef(); // reference audio component
  const progressBar = useRef(); // reference to progress bar
  const animationRef = useRef(); // reference the animation

  const onLoadedMetadata = () => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  };

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

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

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changeRange = () => {
    console.log("Before change: " + progressBar.current.value);
    console.log("Before change: " + audioPlayer.current.currentTime);
    audioPlayer.current.currentTime = progressBar.current.value;
    console.log("After change: " + audioPlayer.current.currentTime);
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

  return (
    <div className={styles.audioPlayer}>
      <div className="flex items-center">
        <audio
          ref={audioPlayer}
          src={`http://localhost:8082/audio/download/${recordingName}`}
          preload="metadata"
          onLoadedMetadata={onLoadedMetadata}
        ></audio>
        {/* <audio
          ref={audioPlayer}
          src="http://localhost:8082/audio/download/1691995312720_Patricia_Recording_1.wav"
          preload="metadata"
          onLoadedMetadata={onLoadedMetadata}
        ></audio> */}

        {/* current time */}
        <div className="mr-2">{calculateTime(currentTime)}</div>

        {/* progress bar */}
        <div className="flex-1">
          <input
            type="range"
            className={styles.progressBar}
            defaultValue="0"
            ref={progressBar}
            onChange={changeRange}
          ></input>
        </div>

        {/* duration */}
        <div className="ml-2">
          {duration && !isNaN(duration) && calculateTime(duration)}
        </div>
      </div>
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

      <div class="relative mx-12 pt-1">
        <div class="mb-2">
          <p className="font-bold text-[#80F2AA]">{employeeName}</p>
        </div>
        <div class="mb-4 flex h-2 overflow-hidden rounded bg-[#F5F5F5] text-xs">
          {initialParagraphs.map((paragraph) => {
            const startTime = paragraph[2];
            const endTime = paragraph[3];
            if (paragraph[0] == true) {
              const widthPercentage = `${
                ((endTime - startTime) / duration) * 100
              }%`;
            //   console.log(widthPercentage);
              return (
                <div
                  style={{ width: widthPercentage }}
                  class="bg-[#80F2AA] transition-all duration-500 ease-out"
                ></div>
              );
            } else {
              const gap = endTime - startTime;
              const widthPercentage = `${(gap / duration) * 100}%`;
              // console.log(widthPercentage);
              return (
                <div
                  style={{ width: widthPercentage }}
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
          {initialParagraphs.map((paragraph) => {
            const startTime = paragraph[2];
              const endTime = paragraph[3];
              if (paragraph[0] == false) {
              const widthPercentage = `${
                ((endTime - startTime) / duration) * 100
              }%`;
              return (
                <div
                  style={{ width: widthPercentage }}
                  class="bg-[#F5F5F5] transition-all duration-500 ease-out"
                ></div>
              );
            } else {
              const gap = endTime - startTime;
              const widthPercentage = `${(gap / duration) * 100}%`;
              return (
                <div
                  style={{ width: widthPercentage }}
                  class="bg-[#9554FE] transition-all duration-500 ease-out"
                ></div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export { AudioPlayer };
