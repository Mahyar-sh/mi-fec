import { Link } from 'react-router-dom';
import { Button, Modal, Space, Table } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { AppRoutes } from '../routes';
import styles from './videos-table.module.css';
import videoService from '../../services/videos';
import type { ProcessedVideo } from '../../common/interfaces';
import { useVideosState } from '../../states/videos-context';

const { Column } = Table;

type VideosTableProps = {
  videos: ProcessedVideo[];
};

export const VideosTable = ({ videos }: VideosTableProps) => {
  const { removeVideo, authors } = useVideosState();

  const onRemoveClicked = (video: ProcessedVideo) => {
    Modal.confirm({
      title: 'Remove video?',
      content: 'Are you sure you want to remove video?',
      okText: 'I am sure!',
      cancelText: 'Not now',
      onOk: () => {
        videoService.removeVideo(video, authors).then(() => {
          removeVideo(video);
        });
      },
    });
  };

  return (
    <div className={styles.wrapper}>
      <Table dataSource={videos} pagination={false} rowKey="id">
        <Column title="Video Name" dataIndex="name" key="name" />
        <Column title="Author" dataIndex="author" key="author" />
        <Column title="Categories" dataIndex="categories" key="categories" />
        <Column title="Highest Quality Format" dataIndex="highestQuality" key="highestQuality" />
        <Column title="Release Date" dataIndex="releaseDate" key="releaseDate" />
        <Column
          title="Options"
          key="options"
          render={(_: any, video: ProcessedVideo) => (
            <Space size="middle">
              <Link to={`/${AppRoutes.EDIT_VIDEO}/${video.id}`}>
                <Button type="primary" icon={<EditOutlined />} />
              </Link>
              <Button
                type="primary"
                danger
                onClick={(e) => {
                  onRemoveClicked(video);
                }}
                icon={<DeleteOutlined />}
              />
            </Space>
          )}
        />
      </Table>
    </div>
  );
};
