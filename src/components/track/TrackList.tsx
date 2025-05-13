import React, { useState } from "react";
import { Track } from "@/types/Track";
import { formatDistance as dateFnsFormatDistance } from 'date-fns';

interface TrackListProps {
  tracks: Track[];
  onRemoveTrack?: (trackId: string) => void;
  onPlayTrack?: (trackId: string) => void;
  showAddedDate?: boolean;
  isPlaylist?: boolean;
}

const TrackList: React.FC<TrackListProps> = ({
  tracks,
  onRemoveTrack,
  onPlayTrack,
  showAddedDate = false,
  isPlaylist = false,
}) => {
  const [hoveredTrackId, setHoveredTrackId] = useState<string | null>(null);

  const handlePlayTrack = (trackId: string) => {
    if (onPlayTrack) {
      onPlayTrack(trackId);
    }
  };

  const handleRemoveTrack = (e: React.MouseEvent, trackId: string) => {
    e.stopPropagation(); // Prevent triggering row click
    if (onRemoveTrack) {
      onRemoveTrack(trackId);
    }
  };

  const formatDistance = (date1: Date, date2: Date, options: { addSuffix: boolean }) => {
    return dateFnsFormatDistance(date1, date2, options);
  };

  const formatDuration = (duration: number): string => {
    if (!duration) return '0:00';
    
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="track-list w-full mt-4">
      {/* Headers */}
      <div className="grid grid-cols-12 gap-4 px-4 py-2 border-b border-gray-700 text-sm text-gray-400">
        <div className="col-span-1 flex items-center justify-center">#</div>
        <div className="col-span-5">TITLE</div>
        <div className="col-span-3">ARTIST</div>
        {showAddedDate && <div className="col-span-2">ADDED</div>}
        <div className="col-span-1 flex items-center justify-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>

      {/* Track Rows */}
      {tracks.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          No tracks available.
        </div>
      ) : (
        tracks.map((track, index) => (
          <div
            key={track.id}
            className={`grid grid-cols-12 gap-4 px-4 py-3 hover:bg-gray-800 cursor-pointer ${
              hoveredTrackId === track.id ? "bg-gray-800" : ""
            }`}
            onMouseEnter={() => setHoveredTrackId(track.id)}
            onMouseLeave={() => setHoveredTrackId(null)}
            onClick={() => handlePlayTrack(track.id)}
          >
            <div className="col-span-1 flex items-center justify-center">
              {hoveredTrackId === track.id ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <span className="text-gray-400">{index + 1}</span>
              )}
            </div>
            <div className="col-span-5 flex items-center">
              {track.coverImage && (
                <img
                  src={track.coverImage || undefined}
                  alt={track.title}
                  className="w-10 h-10 mr-4 rounded"
                />
              )}
              <div>
                <div className="text-white font-medium">{track.title}</div>
                {track.album && (
                  <div className="text-sm text-gray-400">{track.title}</div>
                )}
              </div>
            </div>
            <div className="col-span-3 flex items-center text-gray-300">
              {track.artists?.map((artist, i) => (
                <React.Fragment key={artist.id}>
                  <span>{artist.name}</span>
                  {i < track.artists.length - 1 && <span>, </span>}
                </React.Fragment>
              ))}
            </div>
            {showAddedDate && (
              <div className="col-span-2 flex items-center text-gray-400 text-sm">
                {track.releaseDate &&
                  formatDistance(new Date(track.releaseDate), new Date(), {
                    addSuffix: true,
                  })}
              </div>
            )}
            <div className="col-span-1 flex items-center justify-end space-x-2">
              <span className="text-gray-400 text-sm">
                {formatDuration(track.duration)}
              </span>
              {isPlaylist && onRemoveTrack && (
                <button
                  onClick={(e) => handleRemoveTrack(e, track.id)}
                  className="text-gray-400 hover:text-white p-1 rounded focus:outline-none"
                  title="Remove from playlist"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TrackList;