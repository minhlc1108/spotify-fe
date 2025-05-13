export type LibraryType = {
  likedTracks: LibraryTypeTrack[];
  savedAlbums: LibraryTypeAlbum[];
  followedArtists: LibraryTypeArtist[];
  savedPlaylists: LibraryTypePlaylist[];
};

export type LibraryTypeTrack = {
  id: string;
  title: string;
  duration: number;
  artists: Artist[];
  coverImage: string;
  audioFile: string;
  videoFile: string | null;
};

export type LibraryTypeAlbum = {
  id: string;
  title: string;
  albumType: string;
  artists: Artist[];
  coverImage: string;
};

export type LibraryTypePlaylist = {
  id: string;
  title: string;
  description: string;
  coverImage: string;
};

export type LibraryTypeArtist = {
  id: string;
  name: string;
  image: string;
};
