import HorizontalScrollFeed from '@/components/horizontal-feeds/horizontal-scroll-feed';

import './feeds.scss';
import { useEffect } from 'react';
import { axios } from '@/api';

export default function Feeds() {
  useEffect(() => {
    axios.get('/auth/test').then((response) => {
      console.log(response.data);
    });
  }, []);
  return (
    <section className="feeds-sections">
      <HorizontalScrollFeed headerLabel="Trending Recipes" />
    </section>
  );
}
