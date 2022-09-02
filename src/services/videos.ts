import { getCategories } from './categories';
import { getAuthors } from './authors';
import { Format, ProcessedVideo, Video } from '../common/interfaces';

export const getVideos = async (): Promise<ProcessedVideo[]> => {
  const [categories, authors] = await Promise.all([getCategories(), getAuthors()]);

  const processedVideos: ProcessedVideo[] = [];
  authors.forEach((author) => {
    author.videos.forEach((video) => {
      const categoriesName: string[] = categories.filter((category) => video.catIds.includes(category.id)).map((category) => category.name);
      const processedVideo: ProcessedVideo = {
        ...video,
        author: author.name,
        categories: categoriesName,
        highestQuality: computeHighestQuality(video.formats),
      };
      processedVideos.push(processedVideo);
    });
  });

  return processedVideos;
};

const computeHighestQuality = (formats: Format): string => {
  let highestQuality = {
    size: Number.NEGATIVE_INFINITY,
    res: '',
    name: '',
  };
  for (const formatsKey in formats) {
    const format = formats[formatsKey];
    if (format.size > highestQuality.size) {
      highestQuality = {
        ...format,
        name: formatsKey,
      };
    } else if (format.size === highestQuality.size && compareFormatRes(format.res, highestQuality.res) === 1) {
      highestQuality = {
        ...format,
        name: formatsKey,
      };
    }
  }
  return `${highestQuality.name} ${highestQuality.res}`;
};

const compareFormatRes = (resA: string, resB: string) => {
  const resAInt = parseInt(resA.substring(0, resA.length - 2), 10);
  const resBInt = parseInt(resB.substring(0, resB.length - 2), 10);
  return resAInt > resBInt ? 1 : resAInt === resBInt ? 0 : -1;
};
