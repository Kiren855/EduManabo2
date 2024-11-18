import React, { useState } from "react";

const VideoUploader = () => {
    const [videoDuration, setVideoDuration] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file && file.type.startsWith("video")) {
            const videoElement = document.createElement("video");
            const videoURL = URL.createObjectURL(file);

            videoElement.src = videoURL;

            videoElement.onloadedmetadata = () => {
                setVideoDuration(videoElement.duration);
                URL.revokeObjectURL(videoURL); // Xóa URL sau khi lấy thông tin xong để tránh rò rỉ bộ nhớ
            };
        } else {
            alert("Vui lòng chọn một file video.");
        }
    };

    return (
        <div>
            <input type="file" accept="video/*" onChange={handleFileChange} />
            {videoDuration && <p>Thời lượng video: {videoDuration.toFixed(2)} giây</p>}
        </div>
    );
};

export default VideoUploader;
