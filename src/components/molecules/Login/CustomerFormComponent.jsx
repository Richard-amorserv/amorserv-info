import React from "react";
import { useSelector, useDispatch } from "react-redux";
import EmojiHeader from "../../atoms/Login/EmojiHeader";
import Header from "../../atoms/Login/Header";
import Paragraph from "../../atoms/Login/Paragraph";
import InputLabel from "../../atoms/Login/InputLabel";
import Input from "../../atoms/Login/Input";
import Button from "../../atoms/Login/button";
import useBasicInput from "../../../hooks/useBasicInput";
import ValidationErrorText from "../../atoms/Login/ValidationErrorText";
import ForgotPassword from "../../atoms/Login/ForgotPassword";
import { isValidEmail, isNotEmpty } from "../../../helpers/validation";
import { loginCustomerActions, loginCustomer } from "../../../state-manager/reducers/login/loginCustomer";

const CustomerFormComponent = () => {
	const loginCustomerState = useSelector((state) => state.loginCustomer);

	const dispatch = useDispatch();

	const {
		enteredValue: usernameValue,
		errorMessage: usernameErrorMessage,
		setErrorMessage: usernameSetErrorMessage,
		hasError: usernameHasError,
		setHasError: usernameSetHasError,
		valueChangeHandler: usernameChangeHandler,
		valueBlurHandler: usernameBlurHandler,
		valueIsValid: usernameIsValid,
		errorFromServer: usernameErrFromServer,
		setErrorFromServer: usernameSetErrorFromServer,
		id: usernameId,
	} = useBasicInput(isValidEmail);

	const {
		enteredValue: passwordValue,
		errorMessage: passwordErrorMessage,
		setErrorMessage: passwordSetErrorMessage,
		hasError: passwordHasError,
		setHasError: passwordSetHasError,
		valueChangeHandler: passwordChangeHandler,
		valueBlurHandler: passwordBlurHandler,
		valueIsValid: passwordIsValid,
		errorFromServer: passwordErrFromServer,
		setErrorFromServer: passwordSetErrorFromServer,
		id: passwordId,
	} = useBasicInput(isNotEmpty);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			loginCustomer({
				username: usernameValue,
				password: passwordValue,
				deviceName: "windows 10",
			})
		);
	};

	const isButtonDisabled = !(passwordIsValid && usernameIsValid);
	// const isButtonDisabled = false

	return (
		<form onSubmit={submitHandler} className="max-w-[26.56rem]">
			<div className="mb-[1.2rem]">
				<EmojiHeader position={"left"}>👋</EmojiHeader>
			</div>
			<Header position={"left"}>Welcome back!</Header>
			<Paragraph position={"left"}>Login to your Dashboard</Paragraph>
			<div className="mt-[1rem] space-y-[1rem]">
				<div className="">
					<InputLabel htmlFor={usernameId}>Username</InputLabel>
					<Input
						placeholder="Type your registered email"
						type="text"
						value={usernameValue}
						onBlur={usernameBlurHandler}
						onChange={usernameChangeHandler}
						hasError={usernameHasError}
						id={usernameId}
					/>
					{usernameHasError && (
						<ValidationErrorText errorFromServer={usernameErrFromServer}>
							{usernameErrorMessage}
						</ValidationErrorText>
					)}
				</div>
				<div className="">
					<InputLabel htmlFor={passwordId}>Password</InputLabel>
					<Input
						placeholder="Type your password"
						type="password"
						value={passwordValue}
						onBlur={passwordBlurHandler}
						onChange={passwordChangeHandler}
						hasError={passwordHasError}
						id={passwordId}
					/>
					{passwordHasError && <ValidationErrorText>{passwordErrorMessage}</ValidationErrorText>}
				</div>
				<div className="">
					<ForgotPassword>Forgot Password?</ForgotPassword>
				</div>
				<div className="w-full">
					<Button isDisabled={isButtonDisabled} type="submit" isLoading={false}>
						Sign in
					</Button>
				</div>
			</div>
		</form>
	);
};

export default CustomerFormComponent;
