import React, { Component } from "react";
import { QrReader } from "react-qr-reader";
import { useNavigate } from 'react-router-dom';

class QRCodeReader extends Component {
  state = {
    result: "No result",
  };

  handleScan = (data) => {
    if (data) {
      this.setState({
        result: data,
      });
      if(this.state.result.text !== undefined) {
            // const navication = useNavigate();
              window.location.href = `/chat?address=${this.state.result.text}`;
            // navication(("/chat?address=" + this.state.result.text));
        //   console.log(this.state.result.text);
      }
    }
  };
  handleError = (err) => {
    console.error(err);
  };
  render() {
    return (
      <>
        <QrReader
          delay={300}
          constraints={{ facingMode: "environment" }}
          onError={this.handleError}
          onResult={this.handleScan}
          videoId="qr-code-reader"
          videoStyle={{width: "100％" }}
        />
      </>
    );
  }
}
export default QRCodeReader;
