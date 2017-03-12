import React, { Component } from 'react';
import noImage from './noImage.png'
import './App.css';
//import ReactDOM from 'react-dom';

// textInput must be declared here so the ref callback can refer to it
//let textInput = null;

class App extends Component {
  constructor(props) {
    super(props);
    this.state={ rotate:false }
    this.changeHandler = this.changeHandler.bind(this);
  }
  changeHandler(state) {
    this.setState(state);
  }
  render() {
    return (
      <div className="overall">
        <div className="image">
          <ImageUpload rotate={this.state.rotate} />
        </div>
        <div className="editing">
          <Application onChange={this.changeHandler} rotate={this.state.rotate} />

        </div>
        <button className="reset">
          reset
        </button>
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
    let applied_func = this.props.rotate ? 'rotate' : '';

    let {imagePreviewUrl, file} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} alt="" />);
    } else {
      $imagePreview = (<div className={applied_func}>
        <img src={noImage} className="image_dis" alt="no image"
        ref={(img) => {this.imageTag = img;}} />
      </div>);
    }
    return (
      <div className="previewComponent">
      <div className="imgPreview">
        {$imagePreview}
      </div>
        <input id="fileInput"
          type="file"
          onChange={(e)=>this.handleImageChange(e)} style={{ display: 'none' }} />
        <button href="#" id="fileSelect">
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
              </dl>
            </div>
          </div>;
  }
}


export default App;
