import React from "react";

interface PlaylistHeaderProps {
  title: string;
  description: string | null;
  coverImage?: string | null;
  trackCount: number;
  createdAt: string;
}

const PlaylistHeader: React.FC<PlaylistHeaderProps> = ({
  title,
  description,
  coverImage,
  trackCount,
  createdAt,
}) => {
  // Format the created date to a readable format (e.g., "2 months ago")

  return (
    <div className="playlist-header flex items-start p-6 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="cover-image mr-6">
        {coverImage ? (
          <img
            src={coverImage}
            alt={`${title} cover`}
            className="w-48 h-48 rounded-md shadow-lg object-cover"
          />
        ) : (
          <div className="w-48 h-48 rounded-md bg-gray-700 flex items-center justify-center shadow-lg">
            <svg
              className="w-16 h-16 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z"></path>
            </svg>
          </div>
        )}
      </div>
      
      <div className="playlist-info flex-1">
        <div className="text-sm font-medium text-gray-400">PLAYLIST</div>
        <h1 className="text-3xl font-bold text-white mt-1 mb-2">{title}</h1>
        
        {description && (
          <p className="text-gray-400 mb-4 text-sm">{description}</p>
        )}
        
        <div className="playlist-meta text-sm text-gray-400">
          <span className="font-medium">
            {trackCount} {trackCount === 1 ? "track" : "tracks"}
          </span>
          <span className="mx-2">•</span>
          <span>Created {}</span>
        </div>
      </div>
    </div>
  );
};

export default PlaylistHeader;