import React, { Component } from 'react';
import Header from './containers/Header/Header';
import TeamList from './containers/TeamList/TeamList';

import './assets/scss/main.scss';

class App extends Component {
    render() {
        return (
            <div>
                <header>
                    <Header />
                </header>
                <main>
                    <TeamList />
                </main>
                <footer>Footer component</footer>
            </div>
        );
    }
}

export default App;
