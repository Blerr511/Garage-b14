import React, { useState, useEffect } from 'react';
import Gallery from 'react-grid-gallery';
import { styles } from '../../styles/main';
import ReactHtmlParser from 'react-html-parser';
import ArrowPaginate from '../ArrowPaginate/ArrowPaginate';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import './Portfolio.less';

const Portfolio = _ => {
  const classes = styles();
  const [{ desc, content, style, count }, setPageContent] = useState({
    ..._.params,
    count: _.params.content.length
  });
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(_.matchMedia ? 4 : 26);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchContent(_.params._id, page, limit);
  }, [page, limit]);
  const fetchContent = async (pageId, page, limit) => {
    try {
      setLoading(true);
      let data = await fetch(
        `${process.env.SERVER}/api/getSingle?contentLimit=${limit}&contentPage=${page}&pageId=${pageId}`
      );
      if (data.status !== 200) {
        const err = await data.json();
        throw err.message;
      }
      data = await data.json();
      setPageContent({ ...data.data, count: data.count });
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };
  const images = content
    ? content.map(el => {
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
      })
    : [];
  return (
    <div
      className="portfolio"
      style={{
        background: style.bg.type === 'color' ? style.bg.val : 'black'
      }}
    >
      <ArrowPaginate
        style={{ background: 'white', border: '1px solid black' }}
        component="div"
        count={count}
        rowsPerPage={limit}
        page={page}
        marginBorders={_.matchMedia ? '1%' : '5%'}
        onChangePage={_ => {
          setPage(_);
        }}
        onChangeRowsPerPage={_ => {
          setLimit(_.target.value);
          setPage(0);
        }}
      />
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
      <div style={{ display: 'flex', flexDirection: 'column', zIndex: 2 }}>
        <div className={loading ? 'fading' : 'showing'}>
          <Gallery
            id={`reactGridGalarey`}
            enableImageSelection={false}
            backdropClosesModal={true}
            images={images}
          />
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
