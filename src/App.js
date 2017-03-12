import React, { Component } from 'react';
import noImage from './noImage.png'
import './App.css';
//import ReactDOM from 'react-dom';

// textInput must be declared here so the ref callback can refer to it
//let textInput = null;

class Available extends React.Component{
  render(){
    return (
        <div className="available">
        <p> available actions</p>
        <dl>
          <dt>
            <button className="rotate">
              rotate
            </button>
          </dt>
          <dt>
            <button className="translate">
              translate
            </button>
          </dt>
          <dt>
            <button className="opacity">
              opacity
            </button>
          </dt>
        </dl>
        </div>
    )
  }
}

class Applied extends React.Component {
  render(){
    return (
      <div className="applied">
        <p> applied actions</p>
        <dl>
          <dt>
            <button className="scale">
              scale
            </button>
          </dt>
        </dl>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="overall">
        <div className="image">
          <ImageUpload />
        </div>

        <div ClassName="edit">
          <Available />
          <Applied />
          <button className="reset">
            reset
          </button>
        </div>

        <button className="reset">
          reset
        </button>
        <div className="editing">
          <Application />
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
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} alt="" />);
    } else {
      $imagePreview = (<div className="image_display">
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
    this.state={ hidden: false }
  }
  handleClick() {
    this.setState({
      hidden:!this.state.hidden
      })
  }
  render() {
    return<div className="edit">
            <div className="available">
              <p>Available Actions</p>
              <dl>
                <dt>
                <button className={(!this.state.hidden)? '' : 'hidden'}
                   onClick={() => this.handleClick()}>
                     rotate
                </button>
                </dt>

              </dl>
            </div>
            <div className="applied">
              <p> Applied Actions</p>
              <dl>
                <dt>
                  <button className={(this.state.hidden)? '' : 'hidden'}
                     onClick={() => this.handleClick()}>
                       rotated
                  </button>
                </dt>
              </dl>
            </div>
          </div>;
  }
}


export default App;
