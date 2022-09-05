import { Button, Form, Input, Select } from 'antd';
import { ChangeEvent, useEffect, useState } from 'react';

import styles from './video-form.module.css';
import { ProcessedVideo } from '../common/interfaces';
import { useVideosState } from '../states/videos-context';
import { generateNewVideoId, generateRandomDate } from '../utils/video-utils';
import { PREDEFINED_HIGHEST_QUALITY, PREDEFINED_VIDEO_FORMAT } from '../common/const';

const { Option } = Select;

interface VideoFormProps {
  submit: (video: ProcessedVideo) => void;
  video?: ProcessedVideo;
}

export const VideoForm = ({ submit, video }: VideoFormProps) => {
  const { categories: categoriesOptions, authors: authorsOptions, videos } = useVideosState();

  const [videoName, setVideoName] = useState<string>('');
  const [authorId, setAuthorId] = useState<string>();
  const [categoryIds, setCategoryIds] = useState<string[]>();

  useEffect(() => {
    const initializeForm = () => {
      setVideoName(video?.name!);
      setAuthorId(JSON.stringify(video?.authorId));
      setCategoryIds(video?.catIds.map((catId) => JSON.stringify(catId)));
    };
    if (!!video) {
      initializeForm();
    }
  }, [video]);

  const handleCategoryChange = (values: string[]) => {
    setCategoryIds(values);
  };

  const handleAuthorChange = (value: string) => {
    setAuthorId(value);
  };

  const handleVideoNameChangeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVideoName(event.target.value);
  };

  const submitClicked = () => {
    const randomDate = generateRandomDate();
    const randomDateString = `${randomDate.getFullYear()}-${randomDate.getMonth() + 1}-${randomDate.getDate()}`;
    const authorIdInt = parseInt(authorId!, 10);
    const categoryIdsInt = categoryIds?.map((catId) => parseInt(catId, 10))!;
    const categoryNames = categoriesOptions.filter((category) => categoryIdsInt?.includes(category.id)).map((category) => category.name);
    const authorName = authorsOptions.find((author) => author.id === authorIdInt)!.name;
    submit({
      id: !!video ? video.id : generateNewVideoId(videos!),
      name: videoName,
      releaseDate: !!video ? video.releaseDate : randomDateString,
      authorId: parseInt(authorId!, 10),
      author: authorName,
      categories: categoryNames,
      highestQuality: !!video ? video.highestQuality : PREDEFINED_HIGHEST_QUALITY,
      catIds: categoryIdsInt,
      formats: !!video ? video.formats : PREDEFINED_VIDEO_FORMAT,
    });
  };

  return (
    <Form layout="vertical" className={styles.wrapper}>
      <Form.Item label="Video Name">
        <Input placeholder="Enter video name" value={videoName} onChange={handleVideoNameChangeChange} />
      </Form.Item>
      <Form.Item label="Video Author">
        <Select placeholder="Select author name" value={authorId} onChange={handleAuthorChange}>
          {authorsOptions?.map((author) => (
            <Option key={author.id}>{author.name}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Video Categories">
        <Select placeholder="Select categories" value={categoryIds} onChange={handleCategoryChange} mode="multiple">
          {categoriesOptions?.map((category) => (
            <Option key={category.id}>{category.name}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={submitClicked}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
