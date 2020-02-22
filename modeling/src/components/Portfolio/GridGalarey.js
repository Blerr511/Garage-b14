import React, { useState } from 'react';
import { styles } from '../../styles/main';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Model from '../modelVieverComponent/App';
import ArrowPaginate from '../ArrowPaginate/ArrowPaginate';
const GridGalarey = _ => {
  const { items } = _;
  const classes = styles();
  const [currentIndex, setCurentIndex] = useState(-1);
  const catchHundler = _ => setCurentIndex(-1);
  return (
    <div className={classes.flexWrap} style={{ justifyContent: 'flex-start' }}>
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
        {currentIndex >= 0 && (
          <React.Fragment>
            {items[currentIndex] &&
            items[currentIndex].other &&
            items[currentIndex].other.model ? (
              <Model
                modelPath={items[currentIndex].other.model}
                envPath={process.env.SERVER + '/uploads/cube/'}
                texture={items[currentIndex].other.texture}
                material={items[currentIndex].other.material}
                catchHundler={catchHundler}
              />
            ) : (
              <img height={700} src={items[currentIndex].img} />
            )}
          </React.Fragment>
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
          onChangeRowsPerPage={_ => {
            setLimit(_.target.value);
            setPage(0);
          }}
        />
      </Dialog>
    </div>
  );
};

export default GridGalarey;
