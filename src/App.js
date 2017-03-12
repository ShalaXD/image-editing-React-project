import React, { Component } from 'react';
import noImage from './noImage.png'
import './App.css';
//import ReactDOM from 'react-dom';

// textInput must be declared here so the ref callback can refer to it
//let textInput = null;

class App extends Component {
  constructor(props) {
    super(props);
    this.state={rotate:false,translate:false,scale:false,opacity:false }
    this.changeHandler = this.changeHandler.bind(this);
  }
  changeHandler(state) {
    this.setState(state);
  }
  render() {
    return (
      <div className="overall">
        <div className="image">
          <ImageUpload rotate={this.state.rotate}
                        translate={this.state.translate}
                        scale={this.state.scale}
                        opacity={this.state.opacity} />
        </div>
        <div className="editing">
          <Application onChange={this.changeHandler}
                        rotate={this.state.rotate}
                        translate={this.state.translate}
                        scale={this.state.scale}
                        opacity={this.state.opacity} />
        </div>
      </div>
    )
  }
}

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {file: '',imagePreviewUrl: ''};
  }
  handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }
    reader.readAsDataURL(file)
  }
  render() {
    let css_transform = ''
    let css_opacity = ''
    if (this.props.rotate){
      css_transform = css_transform+' rotate(45deg)'
    }
    if (this.props.translate){
      css_transform = css_transform+' translate(-40px)'
    }
    if (this.props.scale){
      css_transform = css_transform+' scale(0.5)'
    }
    if (this.props.opacity){
      css_opacity = css_opacity+'0.5'
    }

    let {imagePreviewUrl, file} = this.state;
    let imagePreview = null;
    if (imagePreviewUrl) {
      imagePreview = (<img src={imagePreviewUrl} style={{ transform: css_transform, opacity:css_opacity }} alt="" />);
    } else {
      imagePreview = (<div>
        <img src={noImage} className="image_dis" alt="no image"
        ref={(img) => {this.imageTag = img;}} />
      </div>);
    }
    return (
      <div className="previewComponent">
      <div className="imgPreview">
        {imagePreview}
      </div>
        <input id="fileInput"
          type="file"
          onChange={(e)=>this.handleImageChange(e)} style={{ display: 'none' }} />
        <button href="#" className="choosebutton">
          <label htmlFor="fileInput">Choose Image</label>
        </button>
      </div>
    )
  }
}

class Application extends React.Component {
  constructor(props) {
    super(props);
  }
  handleClick(func) {
    if(func==="rotation"){
      this.props.onChange({rotate : !this.props.rotate});
    }
    if(func==="translation"){
      this.props.onChange({translate : !this.props.translate});
    }
    if(func==="scaling"){
      this.props.onChange({scale : !this.props.scale});
    }
    if(func==="opacity_change"){
      this.props.onChange({opacity : !this.props.opacity});
    }
    if(func==="resetImage"){
      this.props.onChange({rotate:false, translate:false,scale:false, opacity:false});
    }
  }
  render() {
    return<div className="edit">
            <div className="available">
              <p>Available Actions</p>
              <dl>
                <dt>
                  <button className={(!this.props.rotate)? '' : 'hidden'}
                     onClick={() => this.handleClick("rotation")}>
                       rotate
                  </button>
                </dt>
                <dt>
                  <button className={(!this.props.translate)? '' : 'hidden'}
                     onClick={() => this.handleClick("translation")}>
                       translate
                  </button>
                </dt>
                <dt>
                  <button className={(!this.props.scale)? '' : 'hidden'}
                     onClick={() => this.handleClick("scaling")}>
                       scale
                  </button>
                </dt>
                <dt>
                  <button className={(!this.props.opacity)? '' : 'hidden'}
                     onClick={() => this.handleClick("opacity_change")}>
                       opacity
                  </button>
                </dt>
              </dl>
            </div>

            <div className="applied">
              <p> Applied Actions</p>
              <dl>
                <dt>
                  <button className={(this.props.rotate)? '' : 'hidden'}
                     onClick={() => this.handleClick("rotation")}>
                       rotated
                  </button>
                </dt>
                <dt>
                  <button className={(this.props.translate)? '' : 'hidden'}
                     onClick={() => this.handleClick("translation")}>
                       translate
                  </button>
                </dt>
                <dt>
                  <button className={(this.props.scale)? '' : 'hidden'}
                     onClick={() => this.handleClick("scaling")}>
                       scale
                  </button>
                </dt>
                <dt>
                  <button className={(this.props.opacity)? '' : 'hidden'}
                     onClick={() => this.handleClick("opacity_change")}>
                       opacity
                  </button>
                </dt>
              </dl>
              <div>
              <button className="resetbutton" onClick={() => this.handleClick("resetImage")}>
                reset
              </button>
              </div>
            </div>
          </div>;
  }
}


export default App;
