import { useNavigate } from 'react-router-dom';

import { AppRoutes } from '../routes';
import videoService from '../../services/videos';
import { VideoForm } from '../../components/video-form';
import { ProcessedVideo } from '../../common/interfaces';
import { useVideosState } from '../../states/videos-context';

export const CreateVideo = () => {
  const { authors, addVideo } = useVideosState();
  const navigate = useNavigate();

  const handleSubmit = (video: ProcessedVideo) => {
    videoService.addVideoToAuthor(video, authors).then(() => {
      addVideo(video);
      navigate(`/${AppRoutes.VIDEO_LIST}`);
    });
  };

  return (
    <>
      <h3>Add video</h3>
      <VideoForm submit={handleSubmit} />
    </>
  );
};
