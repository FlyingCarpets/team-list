import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './containers/Header/Header';
import TeamList from './containers/TeamList/TeamList';
import MemberInner from './components/MemberInner/MemberInner';
import PageNotFound from './containers/PageNotFound/PageNotFound';

import './assets/scss/main.scss';

const App = () => (
    <div>
        <header>
            <Header />
        </header>
        <main>
            <Switch>
                <Route exact path='/' component={ TeamList } />
                <Route path={ `/member/:name` } component={ MemberInner } />
                <Route component={ PageNotFound } />
            </Switch>
        </main>
        <footer>Footer component</footer>
    </div>
);

export default App;
