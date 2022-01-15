import * as React from "react";
import { FunctionComponent, useState, useCallback } from "react";

interface LoginPageProps {}

type setCredentialsType = {
    [name: string]: (name: string, value: string) => void;
};
type exampleCredentialsToLogin = {
    correctLogin: string;
    correctPassword: string;
};

type validatorType = {
    [name: string]: (value: string) => boolean;
};

const LoginPage: FunctionComponent<LoginPageProps> = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const validator: validatorType = {
        login: (value: string): boolean => {
            let error = false;
            if (value.length < 2) return (error = true);
            if (!value.match(/^[A-Z\d]/)) return (error = true);
            return error;
        },
        password: (value: string): boolean => {
            let error = false;
            if (value.length < 8) return (error = true);
            if (!value.match(/[A-Z]/)) return (error = true);
            if (!value.match(/[a-z]/)) return (error = true);
            if (!value.match(/\d+/)) return (error = true);
            if (!value.match(/.[!,@,#,$,%,^,&,*,?,_,~]/)) return (error = true);
            return error;
        },
    };

    const setCredentials: setCredentialsType = {
        login: (name: string, value: string): void => {
            const isError = validator[name](value);
            if (isError) return console.log(`${name} is incorrect`);
            setLogin(value);
        },
        password: (name: string, value: string): void => {
            const isError = validator[name](value);
            if (isError) return console.log(`${name} is incorrect`);
            setPassword(value);
        },
        // [name]: (name: string, value: string): void => {
        //     const isError = validator[name](value);
        //     if (isError) return console.log(`${name} is incorrect`);
        //     setLogin(value);
        // },
    };
    const handleChangeName = (e: { target: { name: string; value: string } }) => {
        const { name, value } = e.target;
        setCredentials[name](name, value);
    };
    const isDisableButton = useCallback(() => {
        if (login !== "" && password !== "") {
            return false;
        }
        return true;
    }, [login, password]);

    const exampleCredentialsToLogin: exampleCredentialsToLogin = {
        correctLogin: "Admin",
        correctPassword: "pA$$worD123",
    };

    const checkCredentials = (credentialsToLogin: exampleCredentialsToLogin, login: string, password: string) => {
        const { correctLogin, correctPassword } = credentialsToLogin;
        if (correctLogin === login && correctPassword === password) {
            return true;
        }
        return false;
    };

    const onSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        console.log(`ok`);
        const checkToLogin = checkCredentials(exampleCredentialsToLogin, login, password);
        if (!checkToLogin) return;
        alert("You are logged");
    };

    return (
        <div className="wrapper">
            <form onSubmit={onSubmit}>
                <label htmlFor="">
                    <p>User Login:</p>
                    <input type="text" id="username-input" name="login" onBlur={handleChangeName} />
                </label>
                <label htmlFor="">
                    <p>User Password:</p>
                    <input type="password" id="password-input" name="password" onBlur={handleChangeName} />
                </label>
                <div>
                    <button type="submit" id="login-button" disabled={isDisableButton()}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
