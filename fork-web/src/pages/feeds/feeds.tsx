import HorizontalScrollFeed from '@/components/horizontal-feeds/horizontal-scroll-feed';

import './feeds.scss';

export default function Feeds() {
  return (
    <section className="feeds-sections">
      <HorizontalScrollFeed headerLabel="Trending Recipes" />
    </section>
  );
}
