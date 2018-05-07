import React, {Component} from 'react';
import './App.css';
import Main from './Main';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


class App extends Component {

    render() {
        return (
            <div className="App" style={{display: "flex"}}>
                <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                    <div>
                        <Main/>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default App;
