import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      quotes: [
                {
                "quote": "Life isn’t about getting and having, it’s about giving and being.",
                "author": "Kevin Kruse"
                }
      ],
      index: 0,
    }
  }
  


  async componentDidMount() {
    const response = await fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json")
    const data = await response.json()
    this.setState({
      quotes: data.quotes
    }, this.getRandomIndex)
  }

  getRandomIndex = () => {
    const {quotes} = this.state
    if(quotes.length > 0) {
      const index = Math.floor(Math.random() * quotes.length)
      this.setState({
        index: index,
      })

    }
  }

  render() {
    const {quotes, index} = this.state
    const quote = quotes[index]
    
    const tweet = `https://twitter.com/intent/tweet?text=${quote.quote} - ${quote.author}`
    console.log(tweet)
    return (
      <div className="wrapper d-flex align-items-center justify-content-center" id="quote-box">
        <div className="col-6 box p-5 rounded">
            {quote && (<div className="mb-4"><h5 id="text"><i className="fa fa-quote-left fa-2x"></i>{quote.quote}</h5> <cite className="d-block text-right" id="author">- {quote.author}</cite></div>) }
            <div className="d-flex justify-content-between">
              <a className="btn btn-primary btn-sm" href={tweet} target="_blank" rel="noopener noreferrer" id="tweet-quote"><i className="fa fa-twitter"></i></a>
              <button className="btn btn-primary btn-sm" onClick={this.getRandomIndex} id="new-quote"><i class="fa fa-random"></i> Next Quote</button>
            </div>
        </div>
      </div>
    );
  }
}

export default App;
