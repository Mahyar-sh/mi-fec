import { getCategories } from './categories';
import { getAuthors, updateAuthor } from './authors';
import { Category, ProcessedVideo, SimpleAuthor, Video } from '../common/interfaces';
import { computeCategories, computeHighestQuality, deriveVideosFromProcessedVideos } from '../utils/video-utils';

interface GetAllDataReturn {
  videos: ProcessedVideo[];
  categories: Category[];
  simpleAuthors: SimpleAuthor[];
}

const getAllData = async (): Promise<GetAllDataReturn> => {
  const [categories, authors] = await Promise.all([getCategories(), getAuthors()]);

  const processedVideos: ProcessedVideo[] = [];
  authors.forEach((author) => {
    author.videos.forEach((video) => {
      processedVideos.push({
        ...video,
        author: author.name,
        authorId: author.id,
        categories: computeCategories(video.catIds, categories),
        highestQuality: computeHighestQuality(video.formats),
      });
    });
  });

  return {
    videos: processedVideos,
    categories,
    simpleAuthors: authors.map((author) => ({ id: author.id, name: author.name })),
  };
};

const addVideoToAuthor = async (
  processedVideo: ProcessedVideo,
  authors: SimpleAuthor[],
  videos: ProcessedVideo[]
): Promise<ProcessedVideo> => {
  const targetAuthor = authors?.find((author) => author.id === processedVideo.authorId);
  const video: Video = {
    id: processedVideo.id,
    name: processedVideo.name,
    catIds: processedVideo.catIds,
    formats: processedVideo.formats,
    releaseDate: processedVideo.releaseDate,
  };
  const authorVideos = deriveVideosFromProcessedVideos(videos, targetAuthor!.id);
  await updateAuthor({ ...targetAuthor!, videos: [...authorVideos, video] });
  return processedVideo;
};

const editVideo = async (processedVideo: ProcessedVideo, authors: SimpleAuthor[], videos: ProcessedVideo[]): Promise<ProcessedVideo> => {
  const targetAuthor = authors?.find((author) => author.id === processedVideo.authorId);
  const updatedVideo: Video = {
    id: processedVideo.id,
    name: processedVideo.name,
    catIds: processedVideo.catIds,
    formats: processedVideo.formats,
    releaseDate: processedVideo.releaseDate,
  };
  const authorVideos = deriveVideosFromProcessedVideos(videos, targetAuthor!.id);
  const updatedVideos = authorVideos.map((video) => (video.id === processedVideo.id ? updatedVideo : video));
  await updateAuthor({ ...targetAuthor!, videos: updatedVideos });
  return processedVideo;
};

const removeVideo = async (processedVideo: ProcessedVideo, authors: SimpleAuthor[], videos: ProcessedVideo[]): Promise<ProcessedVideo> => {
  const targetAuthor = authors?.find((author) => author.id === processedVideo.authorId);
  const authorVideos = deriveVideosFromProcessedVideos(videos, targetAuthor!.id);

  const videoIndex = authorVideos.findIndex((video) => processedVideo.id === video.id);
  authorVideos.splice(videoIndex, 1);
  await updateAuthor({ ...targetAuthor!, videos: authorVideos });
  return processedVideo;
};

const videoService = {
  editVideo: editVideo,
  getAllData: getAllData,
  removeVideo: removeVideo,
  addVideoToAuthor: addVideoToAuthor,
};

export default videoService;
