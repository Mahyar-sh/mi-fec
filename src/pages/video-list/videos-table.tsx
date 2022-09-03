import type { ProcessedVideo } from '../../common/interfaces';
import styles from './videos-table.module.css';
import { Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../routes';

type VideosTableProps = {
  videos: ProcessedVideo[];
};

export const VideosTable = ({ videos }: VideosTableProps) => (
  <div className={styles.wrapper}>
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Video Name</th>
          <th>Author</th>
          <th>Categories</th>
          <th>Highest Quality Format</th>
          <th>Release Date</th>
          <th>Options</th>
        </tr>
      </thead>

      <tbody>
        {videos.map((video) => (
          <tr key={video.id}>
            <td>{video.name}</td>
            <td>{video.author}</td>
            <td>{video.categories.join(', ')}</td>
            <td>{video.highestQuality}</td>
            <td>{video.releaseDate}</td>
            <td>
              <Link to={`/${AppRoutes.EDIT_VIDEO}/${video.id}`}>
                <Button type="primary" icon={<EditOutlined />} />
              </Link>
              <Button type="primary" danger icon={<DeleteOutlined />} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
