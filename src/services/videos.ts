import { getCategories } from './categories';
import { getAuthors, updateAuthor } from './authors';
import { Author, Category, ProcessedVideo, Video, VideoWithAuthorId } from '../common/interfaces';
import { computeCategories, computeHighestQuality } from '../utils/video-utils';
import { VideosContext, VideoState } from '../states/videos-context';

interface GetAllDataReturn {
  processedVideos: ProcessedVideo[];
  categories: Category[];
  authors: Author[];
}

export const getAllData = async (): Promise<GetAllDataReturn> => {
  const [categories, authors] = await Promise.all([getCategories(), getAuthors()]);

  const processedVideos: ProcessedVideo[] = [];
  authors.forEach((author) => {
    author.videos.forEach((video) => {
      processedVideos.push({
        ...video,
        author: author.name,
        categories: computeCategories(video.catIds, categories),
        highestQuality: computeHighestQuality(video.formats),
      });
    });
  });

  return { processedVideos, categories, authors };
};

export const addVideoToAuthor = async (
  video: Video,
  authorId: number,
  { authors, videos, categories }: VideoState
): Promise<ProcessedVideo> => {
  const targetAuthor = authors?.find((author) => author.id === authorId);
  const updatedAuthor = await updateAuthor({ ...targetAuthor!, videos: [...(targetAuthor?.videos ?? []), video] });
  const processedVideo: ProcessedVideo = {
    ...video,
    author: updatedAuthor.name,
    categories: computeCategories(video.catIds, categories!),
    highestQuality: computeHighestQuality(video.formats),
  };
  return processedVideo;
};
