import { Button, Form, Input, Select } from 'antd';
import { useVideosState } from '../states/videos-context';
import { ChangeEvent, useEffect, useState } from 'react';
import { Format, Video, VideoWithAuthorId } from '../common/interfaces';
import { generateNewVideoId, generateRandomDate } from '../utils/video-utils';

const { Option } = Select;

const PREDEFINED_VIDEO_FORMAT: Format = {
  one: { res: '1080p', size: 1000 },
};

interface VideoFormProps {
  submit: (video: Video, authorId: number) => void;
  video?: VideoWithAuthorId;
}

export const VideoForm = ({ submit, video }: VideoFormProps) => {
  console.log('VIDEO FORM RENDER');
  const { categories: categoriesOptions, authors: authorsOptions, videos } = useVideosState();

  const [videoName, setVideoName] = useState<string>('');
  const [authorId, setAuthorId] = useState<string>();
  const [categoryIds, setCategoryIds] = useState<string[]>();

  useEffect(() => {
    if (!!video) {
      initializeForm();
    }
  }, [video]);

  const initializeForm = () => {
    setVideoName(video?.name!);
    setAuthorId(JSON.stringify(video?.authorId));
    setCategoryIds(video?.catIds.map((catId) => JSON.stringify(catId)));
  };

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
    submit(
      {
        id: !!video ? video.id : generateNewVideoId(videos!),
        name: videoName,
        releaseDate: randomDateString,
        catIds: categoryIds?.map((catId) => parseInt(catId, 10))!,
        formats: !!video ? video.formats : PREDEFINED_VIDEO_FORMAT,
      },
      parseInt(authorId!, 10)
    );
  };

  return (
    <Form layout="vertical">
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
      <Form.Item label="Video categories">
        <Select onChange={handleCategoryChange} value={categoryIds} mode="multiple" placeholder="Select Categories">
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
