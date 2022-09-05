import 'antd/dist/antd.min.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import { App } from './App';
import { VideosStateProvider } from './states/videos-context';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <VideosStateProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </VideosStateProvider>
);
