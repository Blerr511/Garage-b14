import React, { useState } from 'react';
import { styles } from '../../styles/main';
import Dialog from '@material-ui/core/Dialog';
import ArrowPaginate from '../ArrowPaginate/ArrowPaginate';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
const GridGalarey = _ => {
  const { items } = _;
  const classes = styles();
  const [currentIndex, setCurentIndex] = useState(-1);

  const _items =
    currentIndex >= 0 && items[currentIndex].other
      ? items[currentIndex].other.map(el => ({
          original: el,
          thumbnail: el,
          originalTitle: items[currentIndex].title,
          // description: 'Author   :   ' + items[currentIndex].title,
          thumbnailAlt: items[currentIndex].title
        }))
      : currentIndex >= 0 && items[currentIndex]
      ? [
          {
            original: items[currentIndex].img,
            thumbnail: items[currentIndex].img,
            originalTitle: items[currentIndex].title,
            // description: 'Author   :   ' + items[currentIndex].title,
            thumbnailAlt: items[currentIndex].title
          }
        ]
      : [];

  return (
    <div className={classes.flexWrap} style={{ justifyContent: 'flex-start' }}>
      <Dialog
        open={currentIndex != -1}
        onClose={_ => setCurentIndex(-1)}
        fullWidth={true}
        maxWidth={'lg'}
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            width: 'inherit',
            overflow: 'hidden'
          }
        }}
      >
        {' '}
        {currentIndex >= 0 && (
          <ImageGallery
            items={_items}
            showPlayButton={false}
            showThumbnails={false}
          />
        )}
        <ArrowPaginate
          style={{ background: 'white', border: '1px solid black' }}
          component="div"
          count={items.length}
          rowsPerPage={1}
          page={currentIndex}
          marginBorders={_.matchMedia ? '1%' : '5%'}
          onChangePage={_ => {
            setCurentIndex(_);
          }}
          lazyLoad={true}
          onChangeRowsPerPage={_ => {
            setLimit(_.target.value);
            setPage(0);
          }}
        />
      </Dialog>
      {items.map((el, id) => {
        const img = new Image();
        img.src = el.img;
        const prop = img.width / img.height;
        return (
          <div
            key={el._id}
            style={{ position: 'relative', zIndex: 2, margin: '2px' }}
          >
            {el.desc != '' && (
              <div className={classes.tags}>
                {el.desc.split(' ').map(el => (
                  <span key={Math.random() + el}>{el}</span>
                ))}
              </div>
            )}
            <img
              draggable={false}
              style={{ zIndex: 3, cursor: 'pointer' }}
              width={isNaN(prop) ? 150 : prop * 150}
              height={150}
              src={el.img}
              alt={el.title}
              onClick={_ => setCurentIndex(id)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default GridGalarey;
