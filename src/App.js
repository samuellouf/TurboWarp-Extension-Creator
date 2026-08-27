import Website from './Website';
import WebApp from './WebApp';
import NotFound from './404';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/TurboWarp-Extension-Creator/" element={<Website />} />
                <Route path="/TurboWarp-Extension-Creator/app" element={<WebApp />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
