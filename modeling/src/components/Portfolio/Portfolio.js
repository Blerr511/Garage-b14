import React from 'react';
import Gallery from 'react-grid-gallery';
import { styles } from '../../styles/main';
import ReactHtmlParser from 'react-html-parser';
import './Portfolio.less';

const Portfolio = _ => {
  const classes = styles();
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
        background: style.bg.type === 'color' ? style.bg.val : 'black'
      }}
    >
      {style.bg.type === 'video' && (
        <video className={classes.bgVideoPlayer} autoPlay muted loop>
          <source src={style.bg.val} type="video/mp4" />
        </video>
      )}
      {style.bg.type === 'image' && (
        <img
          className={classes.bgVideoPlayer}
          draggable={false}
          src={style.bg.val}
          alt="Background"
        />
      )}
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
