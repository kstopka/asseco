import * as React from "react";
import { FunctionComponent } from "react";
import LoginPage from "./LoginPage";

interface AppProps {}

const App: FunctionComponent<AppProps> = () => {
    return (
        <div className="wrapper">
            <LoginPage />
        </div>
    );
};

export default App;
