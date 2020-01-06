import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import ReactHtmlParser from 'react-html-parser';
import { Parser } from 'htmlparser2';
import { styles } from '../../styles/main';
import './Services.less';
import { DialogContent, DialogTitle } from '@material-ui/core';

const Popup = el => {
  const [open, setOpen] = useState(false);

  let txt = '';
  const parser = new Parser({
    ontext(text) {
      txt += text;
    }
  });
  parser.write(`<p>${el.desc}</p>`);
  txt = txt.slice(0, 600);
  txt += '... <u>read more</u>';
  return (
    <React.Fragment>
      <Dialog
        PaperProps={{
          style: {
            maxWidth: '80%',
            backgroundColor: '#000000aa',
            color: '#fff'
          }
        }}
        open={open}
        scroll="paper"
        onClose={_ => setOpen(false)}
      >
        <DialogTitle>{el.title}</DialogTitle>

        <DialogContent dividers>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <div>
              <img src={el.img} height={200} alt={el.title} />
            </div>
            <div>{ReactHtmlParser(el.desc)}</div>
          </div>
        </DialogContent>
      </Dialog>
      <div
        onClick={_ => setOpen(true)}
        className="tableBlock"
        id={el.title.replace(/ /g, '_')}
        key={el._id}
      >
        <div>
          <h2>{el.title}</h2> {ReactHtmlParser(`<p>${txt}</p>`)}
        </div>
        <div>
          <img src={el.img} alt={el.title} />
        </div>
      </div>
    </React.Fragment>
  );
};

const Services = props => {
  const { desc, content, style } = props.params;
  const classes = styles();
  const [openDialog, setOpenDialog] = useState(null);
  return (
    <div
      className="services"
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
      <div style={{ zIndex: 10, position: 'relative' }}>
        {/* <h2>our services</h2> */}
        <div>{ReactHtmlParser(desc)} </div>
        {content.map(el => {
          return <Popup key={el._id} {...el} />;
        })}
        <div style={{ position: 'relative', left: '0' }}></div>
      </div>
    </div>
  );
};

export default Services;
