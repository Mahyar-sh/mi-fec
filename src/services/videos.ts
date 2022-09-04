import { getCategories } from './categories';
import { getAuthors, updateAuthor } from './authors';
import { Author, Category, ProcessedVideo, Video } from '../common/interfaces';
import { computeCategories, computeHighestQuality } from '../utils/video-utils';

interface GetAllDataReturn {
  videos: ProcessedVideo[];
  categories: Category[];
  authors: Author[];
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

  return { videos: processedVideos, categories, authors };
};

const addVideoToAuthor = async (processedVideo: ProcessedVideo, authors: Author[]): Promise<ProcessedVideo> => {
  const targetAuthor = authors?.find((author) => author.id === processedVideo.authorId);
  const video: Video = {
    id: processedVideo.id,
    name: processedVideo.name,
    catIds: processedVideo.catIds,
    formats: processedVideo.formats,
    releaseDate: processedVideo.releaseDate,
  };
  await updateAuthor({ ...targetAuthor!, videos: [...(targetAuthor?.videos ?? []), video] });
  return processedVideo;
};

const editVideo = async (processedVideo: ProcessedVideo, authors: Author[]): Promise<ProcessedVideo> => {
  const targetAuthor = authors?.find((author) => author.id === processedVideo.authorId);
  const updatedVideo: Video = {
    id: processedVideo.id,
    name: processedVideo.name,
    catIds: processedVideo.catIds,
    formats: processedVideo.formats,
    releaseDate: processedVideo.releaseDate,
  };
  const updatedVideos = targetAuthor!.videos.map((video) => (video.id === processedVideo.id ? updatedVideo : video));
  await updateAuthor({ ...targetAuthor!, videos: updatedVideos });
  return processedVideo;
};

const removeVideo = async (processedVideo: ProcessedVideo, authors: Author[]): Promise<ProcessedVideo> => {
  const targetAuthor = authors?.find((author) => author.id === processedVideo.authorId);
  const videoIndex = targetAuthor!.videos.findIndex((video) => processedVideo.id === video.id);
  let updatedVideos = targetAuthor!.videos;
  updatedVideos.splice(videoIndex, 1);
  await updateAuthor({ ...targetAuthor!, videos: updatedVideos });
  return processedVideo;
};

const videoService = {
  editVideo: editVideo,
  getAllData: getAllData,
  removeVideo: removeVideo,
  addVideoToAuthor: addVideoToAuthor,
};

export default videoService;
