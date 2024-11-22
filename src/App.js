import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import DefaultLayout from '~/layouts';
import AutoScrollToTop from './components/AutoScrollToTop';

function App() {
  return (
    <Router>
      <div className="App">
        <AutoScrollToTop />
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;

            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            return route.children ? (
              // Nếu có route con, sử dụng Route cha và lặp qua các route con
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              >
                {route.children.map((child, idx) => (
                  <Route
                    key={idx}
                    path={child.path}
                    element={<child.component />}
                  />
                ))}
              </Route>
            ) : (
              // Nếu không có route con, render như trước
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;