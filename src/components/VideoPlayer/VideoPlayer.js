import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlay, faPause, faVolumeHigh, faVolumeLow,
    faVolumeXmark, faArrowRotateLeft, faArrowRotateRight,
    faGear, faExpand, faArrowsLeftRightToLine, faArrowLeft,
    faAngleLeft, faAngleRight
} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import styles from "./VideoPlayer.module.scss";

const cx = classNames.bind(styles)

function VideoPlayer({ lesson, onToggleExpandedView }) {
    console.log('video player', lesson)
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [volume, setVolume] = useState(1);
    const [isExpandedView, setIsExpandedView] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volumeIcon, setVolumeIcon] = useState(faVolumeHigh);
    const [width, setWidth] = useState("100%");
    const [isHovered, setIsHovered] = useState(false);

    const togglePlayPause = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
                setIsPlaying(true);
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
            }

        }
    };

    const skipTime = (seconds) => {
        if (videoRef.current) {
            videoRef.current.currentTime += seconds;
        }
    };

    const changePlaybackRate = (rate) => {
        setPlaybackRate(rate);
        if (videoRef.current) {
            videoRef.current.playbackRate = rate;
        }
    };

    const handleVolumeChange = (value) => {
        setVolume(value);

        if (value === 0) {
            setVolumeIcon(faVolumeXmark); // Icon mute
        } else if (value < 0.6) {
            setVolumeIcon(faVolumeLow); // Icon âm lượng thấp
        } else {
            setVolumeIcon(faVolumeHigh); // Icon âm lượng cao
        }

        if (videoRef.current) {
            videoRef.current.volume = value;
        }
    };

    const toggleExpandedView = () => {
        setIsExpandedView(!isExpandedView);

        if (!isExpandedView) {
            setWidth("80%");
            window.scrollTo({
                top: window.scrollY + 72,
                behavior: "smooth",
            });
        } else {
            setWidth("100%");
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }

        onToggleExpandedView();
    };


    const handleVideoClick = () => {
        togglePlayPause(); // Play or pause when the video is clicked
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
            setDuration(videoRef.current.duration);
        }
    };

    const handleSeekChange = (e) => {
        if (videoRef.current) {
            videoRef.current.currentTime = e.target.value;
        }
    };

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const handleFullScreen = () => {
        if (videoRef.current) {
            if (videoRef.current.requestFullscreen) {
                videoRef.current.requestFullscreen();
            } else if (videoRef.current.webkitRequestFullscreen) { // For Safari
                videoRef.current.webkitRequestFullscreen();
            } else if (videoRef.current.msRequestFullscreen) { // For IE11
                videoRef.current.msRequestFullscreen();
            }
        }
    };

    const watchedPercentage = (currentTime / duration) * 100;


    return (
        <div className={cx('video-lesson', { 'expanded-view': isExpandedView })}>
            <div className={cx('video-container')} style={{
                width: `${width}`,
            }}>
                <div className={cx('video-base')}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div>
                        <video
                            ref={videoRef}
                            src={lesson.videoUrl}
                            onClick={handleVideoClick}
                            onTimeUpdate={handleTimeUpdate}
                        />
                    </div>
                    {(isHovered || !isPlaying) &&
                        (
                            <div className={cx('video-controls')}>
                                <div className={cx('video-progress')}>
                                    <input
                                        type="range"
                                        min="0"
                                        max={duration}
                                        value={currentTime}
                                        onChange={handleSeekChange}
                                        style={{
                                            background: `linear-gradient(to right, #ff0000, #ff7f7f ${watchedPercentage}%, #ccc ${watchedPercentage}%)`,
                                        }}
                                    />
                                </div>

                                <div className={cx('video-control')}>
                                    <div className={cx('df')}>
                                        <button className={cx('btn-icon')} onClick={togglePlayPause}>{isPlaying ? <span className={cx('icon-button')}><FontAwesomeIcon icon={faPause} /></span> : <span className={cx('icon-button')}><FontAwesomeIcon icon={faPlay} /></span>}</button>
                                        <button className={cx('btn-icon')} onClick={() => skipTime(-5)}><span className={cx('icon-button')}><FontAwesomeIcon icon={faArrowRotateLeft} /></span></button>
                                        <select value={playbackRate} onChange={(e) => changePlaybackRate(parseFloat(e.target.value))}>
                                            <option value={0.5}>0.5x</option>
                                            <option value={1}>1x</option>
                                            <option value={1.5}>1.5x</option>
                                            <option value={2}>2x</option>
                                        </select>
                                        <button className={cx('btn-icon')} onClick={() => skipTime(5)}><span className={cx('icon-button')}><FontAwesomeIcon icon={faArrowRotateRight} /></span></button>
                                        <div className={cx('df1')}>
                                            <span className={cx('icon-button-volume')}><FontAwesomeIcon icon={volumeIcon} /></span>
                                            <input
                                                className={cx('custom-range')}
                                                type="range"
                                                min="0"
                                                max="1"
                                                step="0.1"
                                                value={volume}
                                                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                                            />
                                        </div>
                                        <span className={cx('time-display')}>{formatTime(currentTime)} / {formatTime(duration)}</span>
                                    </div>
                                    <div className={cx('df')}>
                                        <button className={cx('btn-icon')} onClick={handleFullScreen}><span className={cx('icon-button')}><FontAwesomeIcon icon={faGear} /></span></button>
                                        <button className={cx('btn-icon')} onClick={handleFullScreen}><span className={cx('icon-button')}><FontAwesomeIcon icon={faExpand} /></span></button>
                                        <button className={cx('btn-icon')} onClick={toggleExpandedView}>
                                            {isExpandedView ?
                                                <span className={cx('icon-button')}><FontAwesomeIcon icon={faArrowLeft} /></span>
                                                :
                                                <span className={cx('icon-button')}><FontAwesomeIcon icon={faArrowsLeftRightToLine} /></span>
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
}

export default VideoPlayer;