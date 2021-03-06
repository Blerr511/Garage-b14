import React, { useState, useRef, useEffect, useMemo } from 'react';
import TablePagionation from '@material-ui/core/TablePagination';
import {
  Card,
  CardActions,
  CardContent,
  LinearProgress,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  CardHeader,
  TablePagination,
  DialogTitle,
  Typography,
  Popover,
  Button,
  TextField
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCheck } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { styles } from '../../../styles/main';

const PortfolioContent = _ => {
  const classes = styles();
  const pageId = _.pageId;

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(50);
  const [page, setPage] = useState(0);
  const [error, setError] = useState('');
  const editTitleRef = useRef();
  const editFileRef = useRef();
  const editFilesRef = useRef();
  const editDescRef = useRef();
  const editFilesMatRef = useRef();
  const editFilesTextRef = useRef();

  useEffect(() => {
    fetchContent(pageId, page, limit);
  }, []);
  useEffect(() => {
    fetchContent(pageId, page, limit);
  }, [page]);
  const fetchContent = async (pageId, page, limit) => {
    try {
      setError('');
      setLoading(true);
      let data = await fetch(
        `${process.env.SERVER}/api/getSingle?contentLimit=${limit}&contentPage=${page}&pageId=${pageId}`
      );
      data = await data.json();

      setData({ ...data.data, count: data.count });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err)
        var text =
          typeof err === 'string'
            ? err
            : typeof err.message === 'string'
            ? err.message
            : 'Somthing goes wrong .';
      else var text = 'Somthing  goes wrong .';
      setError(text);
    }
  };
  const c = useMemo(() => (_.open ? fetchContent(pageId, page, limit) : null), [
    _.open
  ]);
  const contentEditHandler = async (_id, title, desc, logo, otherFiles) => {
    console.log(otherFiles);
    try {
      const formData = new FormData();
      formData.append('contentId', _id);
      if (desc) formData.append('desc', desc);
      if (title) formData.append('title', title);
      if (logo) formData.append('logo', logo);
      if (otherFiles) {
        for (const k in otherFiles) {
          if (otherFiles.hasOwnProperty(k)) {
            const files = otherFiles[k];
            for (let i = 0; i < files.length; i++) {
              const file = files[i];
              formData.append(k, file);
            }
          }
        }
      }

      let data = await fetch(`${process.env.SERVER}/api/editContent`, {
        method: 'POST',
        body: formData
      });
      data = await data.json();

      fetchContent(pageId, page, limit);
      setEditable(null);
    } catch (err) {
      if (err)
        var text =
          typeof err === 'string'
            ? err
            : typeof err.message === 'string'
            ? err.message
            : 'Somthing goes wrong .';
      else var text = 'Somthing  goes wrong .';
      setError(text);
    }
  };
  const removeContentHundler = _.removeContentHundler;
  const [anchorEl, setAnchorEl] = useState(null);
  const [editable, setEditable] = useState(null);
  useMemo(() => {
    if (!_.open) setEditable(null);
  }, [_.open]);
  return (
    <Dialog
      maxWidth={'xl'}
      open={_.open}
      scroll="paper"
      onClose={_.onClose}
      fullWidth={true}
    >
      {loading && <LinearProgress color="secondary" variant="query" />}
      <DialogTitle>{data && data.title}</DialogTitle>

      <DialogContent
        style={{
          minWidth: '512px',
          minHeight: '364px',
          justifyContent: 'flex-start'
        }}
        className={clsx([classes.paper, classes.flexWrap])}
      >
        {error && <div style={{ color: '#f00', padding: '15px' }}>{error}</div>}
        {data &&
          data.content &&
          data.content.map(el => {
            return (
              <React.Fragment key={el._id}>
                {editable === el._id && (
                  <Dialog
                    open={editable === el._id}
                    onClose={() => setEditable(false)}
                  >
                    <div
                      style={{
                        padding: '16px',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
                      <table>
                        <tbody>
                          <tr>
                            <td colSpan="2">
                              <TextField
                                label="Tags"
                                inputRef={editDescRef}
                                defaultValue={el.desc}
                              ></TextField>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <Typography>Thumbnail:</Typography>
                            </td>
                            <td>
                              <input
                                accept=".png , .jpg , .jpeg "
                                type="file"
                                ref={editFileRef}
                                style={{ marginTop: '15px' }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <Typography>Model:</Typography>
                            </td>
                            <td>
                              {' '}
                              <input
                                accept=".png , .jpg , .jpeg , .obj , .mtl , .gltf , .fbx,.json"
                                multiple
                                type="file"
                                ref={editFilesRef}
                                style={{ marginTop: '15px' }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <Typography>Textures:</Typography>
                            </td>
                            <td>
                              {' '}
                              <input
                                accept="image/*"
                                multiple
                                type="file"
                                ref={editFilesTextRef}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <Typography>Materials:</Typography>
                            </td>
                            <td>
                              <input
                                type="file"
                                accept=".mtl"
                                multiple
                                ref={editFilesMatRef}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <DialogActions>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={_ =>
                          contentEditHandler(
                            el._id,
                            editTitleRef.current.value,
                            editDescRef.current.value,
                            editFileRef.current.files[0],
                            {
                              model: editFilesRef.current.files,
                              texture: editFilesTextRef.current.files,
                              material: editFilesMatRef.current.files
                            }
                          )
                        }
                      >
                        Save
                      </Button>
                    </DialogActions>
                  </Dialog>
                )}
                <Card className={classes.cardStandard}>
                  <CardHeader
                    title={
                      editable === el._id ? (
                        <TextField
                          inputRef={editTitleRef}
                          defaultValue={el.title}
                          label="Title"
                        ></TextField>
                      ) : (
                        <Typography>{el.title || '_'}</Typography>
                      )
                    }
                    style={{ padding: '9px 16px 0' }}
                    action={
                      editable === el._id ? (
                        <IconButton color="primary">
                          <FontAwesomeIcon
                            icon={faCheck}
                            style={{ width: '20px', height: '20px' }}
                          />
                        </IconButton>
                      ) : (
                        <IconButton
                          onClick={_ => {
                            setAnchorEl(
                              anchorEl && anchorEl._id
                                ? null
                                : { el: _.currentTarget, _id: el._id }
                            );
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faBars}
                            style={{ width: '20px', height: '20px' }}
                          />
                          <Popover
                            open={anchorEl !== null && anchorEl._id === el._id}
                            anchorEl={anchorEl ? anchorEl.el : null}
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'left'
                            }}
                            transformOrigin={{
                              vertical: 'top',
                              horizontal: 'left'
                            }}
                            // onClose={handlePopoverClose}
                            disableRestoreFocus
                          >
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column'
                              }}
                            >
                              <Button
                                onClick={_ => {
                                  setEditable(anchorEl ? anchorEl._id : null);
                                }}
                              >
                                Edit
                              </Button>
                              <Button
                                onClick={_ => {
                                  setLoading(true);
                                  removeContentHundler(
                                    pageId,
                                    anchorEl._id
                                  ).then(_ =>
                                    fetchContent(pageId, page, limit)
                                  );
                                }}
                              >
                                Delete
                              </Button>
                            </div>
                          </Popover>
                        </IconButton>
                      )
                    }
                  ></CardHeader>

                  <CardContent style={{ padding: '0' }}>
                    {
                      <img
                        src={el.img}
                        style={{
                          width: '200px',
                          height: '175px',
                          objectFit: 'cover'
                        }}
                        alt={el.img}
                      />
                    }
                  </CardContent>
                </Card>
              </React.Fragment>
            );
          })}
      </DialogContent>
      <DialogActions>
        <TablePagination
          rowsPerPageOptions={[25, 50, 100]}
          component="div"
          count={data ? data.count : 0}
          rowsPerPage={limit}
          page={page}
          onChangePage={(_, page) => setPage(page)}
          onChangeRowsPerPage={_ => {
            setLimit(_.target.value);
            setPage(0);
          }}
        />{' '}
      </DialogActions>
    </Dialog>
  );
};

export default PortfolioContent;
