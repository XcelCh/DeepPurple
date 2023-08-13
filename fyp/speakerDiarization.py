from pyannote.audio import Pipeline

def speakerDiarization(audioFilePath):
    pipeline = Pipeline.from_pretrained("pyannote/speaker-diarization",
                                        use_auth_token="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")

    # apply pretrained pipeline
    diarization = pipeline(audioFilePath, min_speakers=2, max_speakers=2)

    # print the result
    for turn, _, speaker in diarization.itertracks(yield_label=True):
        #result.append([format(turn.start, ".2f"), format(turn.end, ".2f"), speaker])
        print(f"{turn.start:.2f}:{turn.end:.2f}:{speaker}")
    
if __name__ == "__main__":
    # Read the function name and parameter from standard input
    function_name = input().strip()
    audio_file_path = input().strip()

    # Call the appropriate function based on the provided name
    if function_name == "speakerDiarization":
        speakerDiarization(audio_file_path)
    else:
        print("Invalid function name provided.")