import NavBar from '../components/NavBar';

function TextAnalyze() {
  return (
    <div className="bg-[#B6C2FF]">
      <NavBar />
      <div
        className="md:container md:mx-auto bg-white my-5 rounded-t-lg"
        style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
      >
        <div className="grid grid-cols-2 gap-4">
          {/* Left */}
          <div className=" m-4 flex flex-col">
            {/* Text Sentiment Analyzer */}
            <p className="text-md font-bold text-left">
              Text Sentiment Analyzer
            </p>

            <textarea
              placeholder="Input your text here ..."
              className=" mt-2 textarea textarea-bordered textarea-md w-full max-w-full h-64"
            ></textarea>

            <button className="btn rounded-full btn-sm bg-[#351D4F] mt-3 normal-case  max-w-[100px]">
              Analyze
            </button>

            {/* Overall Sentiment Analyzer */}
            <p className="text-sm font-bold text-left mt-4 text-[#67557B]">
              Overall Sentiment Analysis
            </p>

            <div className="card card-compact w-full bg-base-100 shadow-xl">
              <div className="bg-[#9B9B9B] rounded-t-lg h-15">&nbsp;</div>
              <div className="card-body h-32">
                <p className="card-body font-bold text-[#67557B]">
                  Waiting for input...
                </p>
              </div>
            </div>
          </div>

          {/* Right - Emotion classifier */}
          <div className="m-4 border">
            <p className="text-sm font-bold text-left mt-4 text-[#67557B]">
              Emotion Classifier Based on Sentiment Analysis
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TextAnalyze;