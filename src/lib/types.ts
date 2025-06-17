export type ContentType = 'album' | 'music' | 'video';

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  rating: number;
  createdAt: Date;
}

export interface BaseContent {
  id: string;
  title: string;
  description: string;
  type: ContentType;
  thumbnailUrl: string;
  createdAt: Date;
  updatedAt: Date;
  averageRating: number;
  comments: Comment[];
}

export interface Album extends BaseContent {
  type: 'album';
  artist: string;
  releaseDate: Date;
  tracks: Music[];
}

export interface Music extends BaseContent {
  type: 'music';
  artist: string;
  albumId?: string;
  duration: number;
  audioUrl: string;
}

export interface Video extends BaseContent {
  type: 'video';
  duration: number;
  videoUrl: string;
  category: string;
}

export type Content = Album | Music | Video;

export interface ContentFilters {
  type?: ContentType;
  search?: string;
  sortBy?: 'title' | 'createdAt' | 'rating';
  sortOrder?: 'asc' | 'desc';
} 