import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//import ReactDOM from 'react-dom';

class FileUploader extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.state = { file: false };
    }
    handleChange(e) {
        this.setState({ file: e.target.value });
    }
    render(){
        const image = (this.state.file) ? <img src={this.state.file} alt=""/> : null;
        return(
            <div>
                <input type="file" id="fileElem" multiple accept="image/*"  onChange={this.handleChange} style={{ display: 'none' }} />
                <button href="#" id="fileSelect">
                    <label htmlFor="fileElem">Choose Image</label>
                 </button>
                <div id="fileList">
                    {image}
                </div>
            </div>
        );
    }
}

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

class ImageDisplay extends React.Component {
  render() {
    return (
      <div className="image_display">
        <img src={logo} className="App-logo" alt="logo"
        ref={(img) => {this.imageTag = img;}}/>
      </div>
    )
  }
}

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
        <Toggle />
        <div className="image">
          <ImageDisplay />
          <FileUploader />
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
        <ImageUpload />
    </div>
    )
  }
}



class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {file: '',imagePreviewUrl: ''};
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log('handle uploading-', this.state.file);
  }

  _handleImageChange(e) {
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
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (
      <div className="previewComponent">
        <form onSubmit={(e)=>this._handleSubmit(e)}>
          <input className="fileInput"
            type="file"
            onChange={(e)=>this._handleImageChange(e)} />
          <button className="submitButton"
            type="submit"
            onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>
        </form>
        <div className="imgPreview">
          {$imagePreview}
        </div>
      </div>
    )
  }
}



export default App;
