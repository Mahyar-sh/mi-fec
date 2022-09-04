import { createRoot } from 'react-dom/client';
import 'antd/dist/antd.min.css';

import { App } from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
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
