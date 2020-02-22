import React, { useRef, useEffect, useState, useMemo } from 'react';
import {
  LinearProgress,
  withStyles,
  lighten,
  Typography,
  makeStyles
} from '@material-ui/core';
import ModelViewer from './classes/ModelViewer';
import { CSSTransition } from 'react-transition-group';
import { Button } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import * as THREE from 'three';

import './styles/App.less';

const styles = makeStyles({
  loadingContainer: {
    position: 'absolute',
    color: '#ffffffdf',
    display: 'flex',
    top: 0,
    left: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    '& >*': {
      margin: '5px 0'
    }
  }
});

const BorderLinearProgress = withStyles({
  root: {
    height: 5,
    width: 600 / 2
  },
  bar: {
    borderRadius: 20,
    backgroundColor: '#FFE05F'
  }
})(LinearProgress);

const Model = _ => {
  const {
    modelPath,
    texture,
    material,
    envPath,
    width,
    height,
    catchHundler
  } = _;
  const type = modelPath.split('.')[modelPath.split('.').length - 1];
  const classes = styles();
  const [myViwer] = useState(new ModelViewer(width, height));
  const [chieldObjects, setChieldObjects] = useState([]);
  const [chieldSprites, setChieldSprites] = useState([]);
  const [loadValue, setLoadValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [play, setPlay] = useState(true);

  const canvasRef = useRef();

  const onProgress = xhr => {
    setLoadValue((xhr.loaded / xhr.total) * 100);
  };

  const loadModel = async () => {
    setLoadValue(0);
    try {
      setLoading(true);
      if (type === 'gltf' || type === 'glb') {
        const obj = await ModelViewer.GLTFLoader(modelPath, onProgress);
        setChieldObjects(_ => _.concat(obj));
        // setLoading(false);
      } else if (type === 'png' || type === 'jpg' || type === 'jpeg') {
        const img = await ModelViewer.ImageLoader(modelPath, onProgress);
        setChieldSprites(_ => _.concat(img));
        // setLoading(false);
      } else if (type === 'obj' || type === 'fbx') {
        let obj;
        if (type === 'obj')
          obj = await ModelViewer.OBJLoader(modelPath, onProgress);
        else obj = await ModelViewer.FBXLoader(modelPath, onProgress);
        if (texture) {
          let _material = new THREE.MeshStandardMaterial();
          if (material) {
            const tmp = await ModelViewer.MTLLoader(material);
            _material = tmp.create('mat');
          }

          if (texture instanceof Array && texture.length > 0) {
            const txt = ModelViewer.textureArrayToObj(texture);
            for (const k in txt) {
              if (txt.hasOwnProperty(k)) {
                _material[k] = await ModelViewer.TextureLoader(txt[k]);
              }
            }
          }
          obj.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
              child.material = _material;
            }
          });
        }
        setChieldObjects(_ => _.concat([{ scene: obj }]));
      }
    } catch (err) {
      setLoading(false);
      if (catchHundler) catchHundler(err);
    }
  };
  useEffect(
    _ => {
      myViwer.removeLast();
      loadModel();
    },
    [_]
  );

  useEffect(_ => {
    myViwer.installOnCanvas(canvasRef.current);
    loadModel();
  }, []);

  useEffect(
    _ => {
      if (chieldObjects.length < 1) return () => {};
      const obj = chieldObjects[chieldObjects.length - 1];
      myViwer.addObject(obj);
      ModelViewer.CubeTextureLoader(envPath)
        .then(map => {
          myViwer.scene.background = map;
          myViwer.lastObj.scene.traverse(child => {
            if (child instanceof THREE.Mesh) child.material.envMap = map;
          });
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
        });
      obj.scene.scale.set(1, 1, 1);
      obj.scene.position.x = 0;
      obj.scene.position.y = 0;
      obj.scene.position.z = 0;
    },
    [chieldObjects]
  );

  useEffect(() => {
    if (chieldSprites.length < 1) return () => {};
    const img = chieldSprites[chieldSprites.length - 1];
    img.scale.set(1, 1, 1);
    myViwer.addSprite(img);
    setLoading(false);
  }, [chieldSprites]);

  useEffect(
    _ => {
      myViwer.rotation = play;
    },
    [play]
  );
  return (
    <section>
      <div
        style={{
          position: 'relative',
          width: myViwer.canvasWidth,
          height: myViwer.height
        }}
      >
        {!loading && type !== 'png' && type !== 'jpg' && type !== 'jpeg' && (
          <Button
            style={{
              color: '#ffffffaa',
              position: 'absolute',
              right: '3%',
              top: '3%'
            }}
            disableFocusRipple
            onClick={_ => setPlay(!play)}
          >
            <FontAwesomeIcon icon={play ? faPause : faPlay} />
          </Button>
        )}
        <canvas
          ref={canvasRef}
          width={ModelViewer.canvasWidth}
          height={ModelViewer.canvasWidth}
          className="mainCanvas"
        />

        {loading && (
          <div className={classes.loadingContainer}>
            <Typography>Loading 3d model</Typography>
            <BorderLinearProgress value={loadValue} variant="determinate" />
          </div>
        )}
      </div>
    </section>
  );
};

export default Model;

Model.propTypes = {
  modelPath: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  envPath: PropTypes.string.isRequired
};

Model.defaultProps = {
  width: 1280,
  height: 720
};
