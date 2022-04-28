import axios from 'axios';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import LaunchDetail from './LaunchDetail';

const SpaceLaunch = () => {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log('Visible');
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );
  useEffect(() => {
    (async () => {
      await loadData();
    })();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://api.spacexdata.com/v3/launches?limit=50&offset=${
          currentPage * 50
        }`
      );
      console.log(res);
      setLaunches(res.data);
      let totalCount = res.headers['spacex-api-count'];
      let pages = Math.ceil(totalCount / 50);
      setTotalPage(pages);
      console.log(launches);
      setLoading(false);
    } catch (e) {
      console.log(e.response);
    }
  };

  const loadMoreData = async (page) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://api.spacexdata.com/v3/launches?limit=50&offset=${page * 50}`
      );
      console.log(res);
      setLaunches([...launches, res.data]);
      let totalCount = res.headers['spacex-api-count'];
      let pages = Math.ceil(totalCount / 50);
      if (currentPage === pages) setHasMore(false);
      setLoading(false);
    } catch (e) {
      console.log(e.response);
    }
  };
  return (
    <div>
      {launches.map((launch, index) => {
        if (launches.length === index) {
          return (
            <LaunchDetail
              key={launch.id}
              ref={lastElementRef}
              launch={launch}
            />
          );
        } else {
          return <LaunchDetail key={launch.id} launch={launch} />;
        }
      })}

      {loading && <h1>Loading component</h1>}
    </div>
  );
};

export default SpaceLaunch;
