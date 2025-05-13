import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  fetchPlaylistDetailAPI, 
  removeTrackFromPlaylistAPI,
  updatePlaylist,
  deletePlaylistAPI,
  addTrackToPlaylistAPI
} from "@/api";
import { PlaylistDetail } from "@/types/Playlist";
import PlaylistHeader from "@/components/PlaylistHeader";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorDisplay from "@/components/ErrorDisplay";
import TrackList from "@/components/track/TrackList";
import AddTrackModal from "@/components/track/AddTrackModal";
import { eventEmitter, PLAYLIST_UPDATED } from "@/utils/events";

const Playlist: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState<PlaylistDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddTrackModalOpen, setIsAddTrackModalOpen] = useState(false);

  useEffect(() => {
    const loadPlaylist = async () => {
      if (!id) {
        setError("No playlist ID provided");
        setLoading(false);
        return;
      }
  
      try {
        setLoading(true);
        const data = await fetchPlaylistDetailAPI(id);
        if (data) {
          setPlaylist(data);
          setError(null);
        } else {
          setError("Failed to load playlist");
        }
      } catch (err) {
        setError("An error occurred while loading the playlist");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    void loadPlaylist();
  }, [id]);

  const handleUpdateTitle = async (newTitle: string) => {
    if (!playlist || !id) return;

    try {
      const updatedPlaylist = await updatePlaylist(id, { 
        title: newTitle,
        description: playlist.description || undefined,
        public: playlist.public
      });
      if (updatedPlaylist) {
        setPlaylist({ ...playlist, title: newTitle });
        eventEmitter.emit(PLAYLIST_UPDATED);
      }
    } catch (err) {
      console.error("Failed to update playlist title:", err);
    }
  };

  const handlePlay = () => {
    // Implement the play functionality here
    console.log("Playing the playlist");
    // You can add logic to play the first track or the entire playlist
  };

  const handleUpdateImage = async (file: File) => {
    if (!playlist || !id) return;

    try {
      const updatedPlaylist = await updatePlaylist(id, {
        coverImage: file,
        title: playlist.title,
        description: playlist.description || undefined,
        public: playlist.public
      });
      
      if (updatedPlaylist) {
        setPlaylist({ ...playlist, coverImage: updatedPlaylist.coverImage });
        eventEmitter.emit(PLAYLIST_UPDATED);
      }
    } catch (err) {
      console.error("Failed to update playlist image:", err);
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    try {
      const success = await deletePlaylistAPI(id);
      if (success) {
        eventEmitter.emit(PLAYLIST_UPDATED);
        void navigate('/', { replace: true });
      }
    } catch (err) {
      console.error("Failed to delete playlist:", err);
    }
  };

  const handleRemoveTrack = async (trackId: string) => {
    if (!playlist || !id) return;

    try {
      const success = await removeTrackFromPlaylistAPI(id, trackId);
      if (success) {
        setPlaylist({
          ...playlist,
          tracks: playlist.tracks.filter(track => track.id !== trackId)
        });
      }
    } catch (err) {
      console.error("Failed to remove track", err);
    }
  };

  const handleAddTrack = async (trackId: string) => {
    if (!playlist || !id) return;

    try {
      const success = await addTrackToPlaylistAPI(id, trackId);
      if (success) {
        // Reload the playlist to get the updated tracks
        const updatedPlaylist = await fetchPlaylistDetailAPI(id);
        if (updatedPlaylist) {
          setPlaylist(updatedPlaylist);
        }
      }
    } catch (err) {
      console.error("Failed to add track:", err);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !playlist || !id) {
    return <ErrorDisplay message={error || "Playlist not found"} />;
  }

  return (
    <div className="playlist-page">
      <PlaylistHeader 
        id={id}
        title={playlist.title}
        description={playlist.description}
        coverImage={playlist.coverImage}
        trackCount={playlist.tracks.length}
        createdAt={playlist.createdAt}
        onUpdateTitle={handleUpdateTitle}
        onUpdateImage={handleUpdateImage}
        onDelete={handleDelete}
      />
      
      <div className="flex justify-between items-center mt-6 mb-4">
  <div className="flex items-center gap-2">
    <button
      onClick={handlePlay}
      className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.586 2.12A1 1 0 019 12.5V6.5a1 1 0 011.166-.966l3.586 1.793a1 1 0 010 1.732z" />
      </svg>
      Play
    </button>

    <button
      onClick={() => setIsAddTrackModalOpen(true)}
      className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
      Add Tracks
    </button>
  </div>
</div>

      <TrackList 
        tracks={playlist.tracks}
        onRemoveTrack={handleRemoveTrack}
        showAddedDate
        isPlaylist
      />

      <AddTrackModal
        isOpen={isAddTrackModalOpen}
        onClose={() => setIsAddTrackModalOpen(false)}
        onAddTrack={handleAddTrack}
      />
    </div>
  );
};

export default Playlist;