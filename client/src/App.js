import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Header from './containers/Header/Header';
import TeamList from './containers/TeamList/TeamList';
import MemerInner from './components/MemberInner/MemberInner';

import './assets/scss/main.scss';

class App extends Component {
    render() {
        return (
            <div>
                <header>
                    <Header />
                </header>
                <main>
                    <Route exact path='/' component={ TeamList }/>
                    <Route path={ `/member/:name` } component={ MemerInner } />
                </main>
                <footer>Footer component</footer>
            </div>
        );
    }
}

export default App;
