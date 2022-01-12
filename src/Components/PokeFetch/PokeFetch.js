import React, { Component } from "react";
import "./PokeFetch.css";

class PokeFetch extends Component {
  constructor() {
    super();
    this.state = {
      pokeInfo: "",
      pokeSprite: "",
      pokeName: "",
      timer: null,
      timerOn: false,
      timeInterval: null,
      revealPokemon: false,
    };
  }

  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
        });
      })
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    this.fetchPokemon();
  }

  turnOnTimer = () => {
    clearInterval(this.state.timeInterval)
    this.fetchPokemon()
    this.setState( {
      revealPokemon: false,
      timerOn: false,
    })
    this.setState( {
      timerOn: true,
      timer: 10,
      timeInterval: setInterval(() => {
        if(this.state.timer > 0) {
          this.setState({
            timer: this.state.timer - 1,
          })
        } else {
          this.setState({
            revealPokemon: true,
            timerOn: false,
          })
        }
      }, 1000)
    })
  }

  render() {
    return (
      <div className={"wrapper"}>
        <button className={"start"} onClick={() => this.turnOnTimer()}>
          Start!
        </button>
        <h1 className={"timer"}>{this.state.timer}</h1>
        <div className={"pokeWrap"}>
        <img className={this.state.revealPokemon ? 'revealPokeImg' : 'hidePokeImg'} src={this.state.pokeSprite} />
          <h1 className={this.state.revealPokemon ? 'revealPokeName' : 'hidePokeName'}>{this.state.pokeName}</h1>
        </div>
      </div>
    );
  }
}

export default PokeFetch;
