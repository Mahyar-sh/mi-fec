import { Category, Format, ProcessedVideo } from '../common/interfaces';

export const generateRandomDate = (start = new Date(1970, 0, 1), end = new Date()): Date => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export const generateNewVideoId = (videos: ProcessedVideo[]): number => {
  const sortedVideosArray = videos.sort((a, b) => a.id - b.id);
  return sortedVideosArray[sortedVideosArray.length - 1].id + 1;
};

export const computeHighestQuality = (formats: Format): string => {
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

export const compareFormatRes = (resA: string, resB: string): 0 | 1 | -1 => {
  const resAInt = parseInt(resA.substring(0, resA.length - 2), 10);
  const resBInt = parseInt(resB.substring(0, resB.length - 2), 10);
  return resAInt > resBInt ? 1 : resAInt === resBInt ? 0 : -1;
};

export const computeCategories = (videoCatIds: number[], categories: Category[]): string[] => {
  return categories.filter((category) => videoCatIds.includes(category.id)).map((category) => category.name);
};
