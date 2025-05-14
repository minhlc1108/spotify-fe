import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface PlaylistHeaderProps {
  id: string;
  title: string;
  description: string | null;
  coverImage?: string | null;
  trackCount: number;
  createdAt: string;
  onUpdateTitle: (newTitle: string) => Promise<void>;
  onUpdateImage: (file: File) => Promise<void>;
  onDelete: () => Promise<void>;
}

const PlaylistHeader: React.FC<PlaylistHeaderProps> = ({
  id,
  title,
  description,
  coverImage,
  trackCount,
  createdAt,
  onUpdateTitle,
  onUpdateImage,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleTitleSubmit = async () => {
    if (newTitle.trim() && newTitle !== title) {
      try {
        await onUpdateTitle(newTitle);
      } catch (error) {
        console.error("Failed to update title:", error);
      }
    }
    setIsEditing(false);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        await onUpdateImage(file);
      } catch (error) {
        console.error("Failed to update image:", error);
      }
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this playlist?')) {
      try {
        await onDelete();
        void navigate('/');
      } catch (error) {
        console.error("Failed to delete playlist:", error);
      }
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      await handleTitleSubmit();
    }
  };

  return (
    <div className="playlist-header flex items-start p-6 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="cover-image mr-6 relative group">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleImageChange}
        />
        {coverImage ? (
          <div className="relative">
            <img
              src={coverImage}
              alt={`${title} cover`}
              className="w-48 h-48 rounded-md shadow-lg object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="text-white text-sm bg-black bg-opacity-50 px-4 py-2 rounded-full hover:bg-opacity-75"
              >
                Change Image
              </button>
            </div>
          </div>
        ) : (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-48 h-48 rounded-md bg-gray-700 flex items-center justify-center shadow-lg cursor-pointer hover:bg-gray-600 transition-colors"
          >
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
        {isEditing ? (
          <div className="flex items-center gap-2 mt-1 mb-2">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="text-3xl font-bold bg-transparent text-white border-b border-white focus:outline-none focus:border-green-500"
              autoFocus
              onBlur={() => void handleTitleSubmit()}
              onKeyDown={handleKeyDown}
            />
          </div>
        ) : (
          <h1 
            className="text-3xl font-bold text-white mt-1 mb-2 cursor-pointer hover:underline"
            onClick={() => setIsEditing(true)}
          >
            {title}
          </h1>
        )}
        
        {description && (
          <p className="text-gray-400 mb-4 text-sm">{description}</p>
        )}
        
        <div className="playlist-meta text-sm text-gray-400">
          <span className="font-medium">
            {trackCount} {trackCount === 1 ? "track" : "tracks"}
          </span>
          <span className="mx-2">•</span>
          <span>Created {new Date(createdAt).toLocaleDateString()}</span>
          <button
            onClick={() => void handleDelete()}
            className="ml-4 text-red-500 hover:text-red-400 transition-colors"
          >
            Delete Playlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaylistHeader;