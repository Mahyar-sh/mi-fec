export interface Category {
  id: number;
  name: string;
}

export type Video = {
  id: number;
  catIds: number[];
  name: string;
  releaseDate: string;
  formats: Format;
};

export interface Author {
  id: number;
  name: string;
  videos: Video[];
}

export type ProcessedVideo = Video & {
  authorId: number;
  author: string;
  categories: string[];
  highestQuality: string;
};

export interface FormatValue {
  res: string;
  size: number;
}

export type Format = Record<string, FormatValue>;
