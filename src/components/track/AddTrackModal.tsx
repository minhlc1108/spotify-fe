import React, { useState, useEffect } from 'react';
import { Track } from '@/types/Track';
import { fetchListTrack } from '@/api';

interface AddTrackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTrack: (trackId: string) => void;
}

const AddTrackModal: React.FC<AddTrackModalProps> = ({ isOpen, onClose, onAddTrack }) => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadTracks = async () => {
      setLoading(true);
      try {
        const data = await fetchListTrack();
        setTracks(data);
      } catch (error) {
        console.error('Failed to load tracks:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      void loadTracks();
    }
  }, [isOpen]);

  const filteredTracks = tracks.filter(track =>
    track.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#282828] rounded-lg p-6 w-[500px] max-h-[80vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Add Tracks</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <input
          type="text"
          placeholder="Search tracks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 mb-4 bg-[#3E3E3E] text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="text-center py-4 text-gray-400">Loading tracks...</div>
          ) : filteredTracks.length === 0 ? (
            <div className="text-center py-4 text-gray-400">No tracks found</div>
          ) : (
            <div className="space-y-2">
              {filteredTracks.map(track => (
                <div
                  key={track.id}
                  className="flex items-center p-2 hover:bg-[#3E3E3E] rounded group cursor-pointer"
                  onClick={() => {
                    onAddTrack(track.id);
                    onClose();
                  }}
                >
                  {track.coverImage && (
                    <img
                      src={track.coverImage}
                      alt={track.title}
                      className="w-10 h-10 rounded mr-3"
                    />
                  )}
                  <div className="flex-1">
                    <div className="text-white font-medium">{track.title}</div>
                    <div className="text-sm text-gray-400">
                      {track.artists?.map(artist => artist.name).join(', ')}
                    </div>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 text-green-500 hover:scale-105 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddTrackModal; 