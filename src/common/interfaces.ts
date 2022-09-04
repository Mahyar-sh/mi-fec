export interface Category {
  id: number;
  name: string;
}

export interface Video {
  id: number;
  catIds: number[];
  name: string;
  releaseDate: string;
  formats: Format;
}

export interface Author {
  id: number;
  name: string;
  videos: Video[];
}

export interface ProcessedVideo {
  id: number;
  name: string;
  author: string;
  categories: string[];
  releaseDate: string;
  highestQuality: string;
}

export type VideoWithAuthorId = Video & { authorId: number };

export interface FormatValue {
  res: string;
  size: number;
}

export type Format = Record<string, FormatValue>;
