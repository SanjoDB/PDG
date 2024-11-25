import { useState } from 'react';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';

export default function YoutubeButton() {
  const [showVideo, setShowVideo] = useState(true);
  const toggleVideo = () => {
    setShowVideo(!showVideo);
  };

  return (
    <div className="relative w-4/5 pt-6 rounded-lg items-center justify-center mb-5">
      <button
        onClick={toggleVideo}
        className={`relative top-0 right-0 w-full h-10 flex items-center justify-center bg-gray-900 text-white ${showVideo ? 'rounded-t-lg' : 'rounded-lg'}`}
      >
        {showVideo ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}
      </button>
      <div
        className={`p-1 rounded-b-lg ${showVideo ? 'relative z-0 h-auto bg-gray-900' : 'hidden'}`}
      >
        {showVideo && (
          <iframe
            className="w-full h-[500px] rounded-b-lg"
            src="https://www.youtube-nocookie.com/embed/dlXc7xx768M?si=b5sCKwpA9Wqq1sWA"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </div>
  );
}
