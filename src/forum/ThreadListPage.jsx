import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getThreads } from '../mock/api/threads';
import ThreadCard from './ThreadCard';
import SearchBar from './SearchBar';
import SortSelector from './SortSelector';
import DateFilter from './DateFilter';
import '../css/forum.css';

const ThreadListPage = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('access');

  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    date_from: '',
    date_to: '',
    sort: 'newest',
    page: 1,
  });

  useEffect(() => {
    let mounted = true;

    const fetch = async () => {
      setLoading(true);
      try {
        const data = await getThreads(filters);
        if (!mounted) return;
        setThreads(data.results || []);
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetch();
    return () => {
      mounted = false;
    };
  }, [filters.search, filters.date_from, filters.date_to, filters.sort, filters.page]);

  return (
    <div className="forum-container">
      <div className="tl-controls">
        <div className="tl-search-wrap">
          <SearchBar
            value={filters.search}
            onChange={(val) => setFilters({ ...filters, search: val, page: 1 })}
          />
        </div>

        <DateFilter
          onChange={(from, to) =>
            setFilters({ ...filters, date_from: from, date_to: to, page: 1 })
          }
        />

        <SortSelector
          value={filters.sort}
          onChange={(val) => setFilters({ ...filters, sort: val })}
        />

        {isLoggedIn && (
          <>
            <button
              className="tl-create-btn"
              onClick={() => navigate('/forum/create')}
            >
              Create Thread
            </button>

            <button
              className="tl-notification-btn"
              type="button"
              aria-label="Notifications"
            >
              🔔
            </button>
          </>
        )}
      </div>

      {loading ? (
        <div className="forum-loading">
          <div className="forum-spinner" />
          Loading threads…
        </div>
      ) : (
        <div className="tl-thread-list">
          {threads.length === 0 ? (
            <div className="thread-empty">
              No threads found. Be the first to start a discussion!
            </div>
          ) : (
            threads.map((t) => <ThreadCard key={t.id} thread={t} />)
          )}
        </div>
      )}
    </div>
  );
};

export default ThreadListPage;