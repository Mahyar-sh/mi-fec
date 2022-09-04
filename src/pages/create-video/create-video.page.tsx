import { VideoForm } from '../../components/video-form';
import { Video, VideoWithAuthorId } from '../../common/interfaces';
import { addVideoToAuthor } from '../../services/videos';
import { useVideosState } from '../../states/videos-context';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../routes';

export const CreateVideo = () => {
  console.log('CREATE VIDEOS');
  const { categories, authors, videos, setVideos } = useVideosState();
  const navigate = useNavigate();

  const handleSubmit = (video: Video, authorId: number) => {
    addVideoToAuthor(video, authorId, { categories, authors, videos }).then((createdVideo) => {
      setVideos([...videos, createdVideo]);
      navigate(`/${AppRoutes.VIDEO_LIST}`);
    });
  };

  return (
    <>
      <h3>Add Video</h3>
      <VideoForm submit={handleSubmit} />
    </>
  );
};
