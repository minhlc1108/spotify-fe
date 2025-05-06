import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPlaylistDetailAPI, removeTrackFromPlaylistAPI } from "@/api";
import { PlaylistDetail } from "@/types/Playlist";
import PlaylistHeader from "@/components/PlaylistHeader";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorDisplay from "@/components/ErrorDisplay";
import TrackList from "@/components/track/TrackList";

const Playlist: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [playlist, setPlaylist] = useState<PlaylistDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
		  console.log(data)
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

	console.log(id)
  }, [id]);

  

  const handleRemoveTrack = async (trackId: string) => {
    if (!playlist || !id) return;

    try {
      const success = await removeTrackFromPlaylistAPI(id, trackId);
      if (success) {
        // Update the local state to reflect the change
        setPlaylist({
          ...playlist,
          tracks: playlist.tracks.filter(track => track.id !== trackId)
        });
      }
    } catch (err) {
      console.error("Failed to remove track", err);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !playlist) {
    return <ErrorDisplay message={error || "Playlist not found"} />;
  }

  return (
    <div className="playlist-page">
      <PlaylistHeader 
        title={playlist.title}
        description={playlist.description}
        coverImage={playlist.coverImage}
        trackCount={playlist.tracks.length}
        createdAt={playlist.createdAt}
      />
      
      <TrackList 
        tracks={playlist.tracks}
        onRemoveTrack={handleRemoveTrack}
        showAddedDate
        isPlaylist
      />
    </div>
  );
};

export default Playlist;