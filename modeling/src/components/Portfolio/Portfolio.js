import React from 'react';
import Gallery from 'react-grid-gallery';

import ReactHtmlParser from 'react-html-parser';
import './Portfolio.less';

const Portfolio = _ => {
  const { desc, content, style } = _.params;
  const [page, setPage] = React.useState(0);
  const temp = content.slice(page * 30, page * 30 + 30);
  const images = temp.map(el => {
    const img = new Image();
    img.src = el.img;
    return {
      src: el.img,
      caption: el.title,
      thumbnail: el.img,
      thumbnailHeight: img.height / 10,
      thumbnailWidth: img.width / 10,
      tags: el.desc
        ? el.desc.split(' ').map(el => ({ value: el, title: el }))
        : []
    };
  });

  return (
    <div
      className="portfolio"
      style={{
        background:
          style.bg.type === 'color'
            ? style.bg.val
            : style.bg.type === 'image'`url(${style.bg.val})`
      }}
    >
      {desc && ReactHtmlParser(desc)}
      <div style={{ maxWidth: '100%' }}>
        <Gallery
          id={`reactGridGalarey`}
          enableImageSelection={false}
          backdropClosesModal={true}
          images={images}
        />
      </div>
    </div>
  );
};

export default Portfolio;
