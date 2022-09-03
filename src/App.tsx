import { Link, Route, Routes } from 'react-router-dom';
import { Button } from 'antd';

import styles from './app.module.css';
import { VideoList } from './pages/video-list';
import { EditVideo } from './pages/edit-video';
import { CreateVideo } from './pages/create-video';
import { AppRoutes } from './pages/routes';

export const App = () => {
  return (
    <>
      <header className={styles.header}>
        Videos
        <Link to={`/${AppRoutes.CREATE_VIDEO}`}>
          <Button type="primary">Add video</Button>
        </Link>
      </header>

      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<VideoList />} />
          <Route path={`/${AppRoutes.EDIT_VIDEO}/:videoId`} element={<EditVideo />} />
          <Route path={`/${AppRoutes.CREATE_VIDEO}`} element={<CreateVideo />} />
        </Routes>
      </main>

      <footer className={styles.footer}>VManager Demo v0.0.1</footer>
    </>
  );
};
