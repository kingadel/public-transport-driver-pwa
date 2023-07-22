// import React, { PureComponent, useState} from 'react';
// import {Typography, useTheme} from "@mui/material";
//
// // keyCode constants
// const BACKSPACE = 8;
// const LEFT_ARROW = 37;
// const RIGHT_ARROW = 39;
// const DELETE = 46;
// const SPACEBAR = 32;
//
//
// // TODO: Better implementation
// const isStyleObject = (obj) => typeof obj === 'object';
//
// class SingleOtpInput extends PureComponent {
//     constructor(props) {
//         super(props);
//         this.input = React.createRef();
//     }
//
//     // Focus on first render
//     // Only when shouldAutoFocus is true
//     componentDidMount() {
//         const {focus, shouldAutoFocus} = this.props;
//         const {current: inputEl} = this.input;
//
//         if (inputEl && focus && shouldAutoFocus) {
//             inputEl.focus();
//         }
//     }
//
//     componentDidUpdate(prevProps) {
//         const {focus} = this.props;
//         const {current: inputEl} = this.input;
//
//         // Check if focusedInput changed
//         // Prevent calling function if input already in focus
//         if (prevProps.focus !== focus && inputEl && focus) {
//             inputEl.focus();
//             inputEl.select();
//         }
//     }
//
//     getClasses = (...classes) => classes.filter((c) => !isStyleObject(c) && c !== false).join(' ');
//
//     getType = () => {
//         const {isInputSecure, isInputNum} = this.props;
//
//         if (isInputSecure) {
//             return 'password';
//         }
//
//         if (isInputNum) {
//             return 'tel';
//         }
//
//         return 'text';
//     };
//
//     render() {
//         const {
//             placeholder,
//             separator,
//             isLastChild,
//             inputStyle,
//             focus,
//             isDisabled,
//             hasErrored,
//             errorStyle,
//             focusStyle,
//             disabledStyle,
//             shouldAutoFocus,
//             isInputNum,
//             index,
//             value,
//             className,
//             isInputSecure,
//             ...rest
//         } = this.props;
//
//         return (
//             <div className={className} style={{display: 'flex', alignItems: 'center'}}>
//                 <Typography
//                     aria-label={`${index === 0 ? 'Please enter verification code. ' : ''}${isInputNum ? 'Digit' : 'Character'} ${
//                         index + 1
//                     }`}
//                     autoComplete="off"
//                     style={Object.assign(
//                         {width: '1em', textAlign: 'center'},
//                         isStyleObject(inputStyle) && inputStyle,
//                         focus && isStyleObject(focusStyle) && focusStyle,
//                         isDisabled && isStyleObject(disabledStyle) && disabledStyle,
//                         hasErrored && isStyleObject(errorStyle) && errorStyle
//                     )}
//                     placeholder={placeholder}
//                     className={this.getClasses(
//                         inputStyle,
//                         focus && focusStyle,
//                         isDisabled && disabledStyle,
//                         hasErrored && errorStyle
//                     )}
//                     type={'tel'}
//                     maxLength="1"
//                     ref={this.input}
//                     disabled={isDisabled}
//                     value={value ? value : ''}
//                     {...rest}
//                 />
//                 {!isLastChild && separator}
//             </div>
//         );
//     }
// }
//
// function OtpInput(props) {
//     const theme = useTheme()
//     // static defaultProps = {
//     //     numInputs: 4,
//     //     onChange: (otp) => console.log(otp),
//     //     isDisabled: false,
//     //     shouldAutoFocus: false,
//     //     value: '',
//     //     isInputSecure: false,
//     // };
//
//     const [state, setState] = useState({
//         activeInput: 0,
//     })
//
//     const getOtpValue = () => (props.value ? props.value.toString().split('') : []);
//
//     const getPlaceholderValue = () => {
//         const {placeholder, numInputs} = props;
//
//         if (typeof placeholder === 'string') {
//             if (placeholder.length === numInputs) {
//                 return placeholder;
//             }
//
//             if (placeholder.length > 0) {
//                 console.error('Length of the placeholder should be equal to the number of inputs.');
//             }
//         }
//     };
//
//     // Helper to return OTP from input
//     const handleOtpChange = (otp) => {
//         const {onChange} = props;
//         const otpValue = otp.join('');
//
//         onChange(otpValue);
//     };
//
//     const isInputValueValid = (value) => {
//         const isTypeValid = props.isInputNum ? !isNaN(parseInt(value, 10)) : typeof value === 'string';
//
//         return isTypeValid && value.trim().length === 1;
//     };
//
//     // Focus on input by index
//     const focusInput = (input) => {
//         const {numInputs} = props;
//         const activeInput = Math.max(Math.min(numInputs - 1, input), 0);
//
//         setState({activeInput});
//     };
//
//     // Handle pasted OTP
//     const handleOnPaste = (e) => {
//         e.preventDefault();
//
//         const {activeInput} = state;
//         const {numInputs, isDisabled} = props;
//
//         if (isDisabled) {
//             return;
//         }
//
//         const otp = getOtpValue();
//         let nextActiveInput = activeInput;
//
//         // Get pastedData in an array of max size (num of inputs - current position)
//         const pastedData = e.clipboardData
//             .getData('text/plain')
//             .slice(0, numInputs - activeInput)
//             .split('');
//
//         // Paste data from focused input onwards
//         for (let pos = 0; pos < numInputs; ++pos) {
//             if (pos >= activeInput && pastedData.length > 0) {
//                 otp[pos] = pastedData.shift();
//                 nextActiveInput++;
//             }
//         }
//
//         setState({activeInput: nextActiveInput}, () => {
//             focusInput(nextActiveInput);
//             handleOtpChange(otp);
//         });
//     };
//
//     const handleOnChange = (e) => {
//         const {value} = e.target;
//
//         if (isInputValueValid(value)) {
//             changeCodeAtFocus(value);
//         }
//     };
//
//     // Handle cases of backspace, delete, left arrow, right arrow, space
//     const handleOnKeyDown = (e) => {
//         if (e.keyCode === BACKSPACE || e.key === 'Backspace') {
//             e.preventDefault();
//             changeCodeAtFocus('');
//             focusPrevInput();
//         } else if (e.keyCode === DELETE || e.key === 'Delete') {
//             e.preventDefault();
//             changeCodeAtFocus('');
//         } else if (e.keyCode === LEFT_ARROW || e.key === 'ArrowLeft') {
//             e.preventDefault();
//             focusPrevInput();
//         } else if (e.keyCode === RIGHT_ARROW || e.key === 'ArrowRight') {
//             e.preventDefault();
//             focusNextInput();
//         } else if (e.keyCode === SPACEBAR || e.key === ' ' || e.key === 'Spacebar' || e.key === 'Space') {
//             e.preventDefault();
//         }
//     };
//
//     // The content may not have changed, but some input took place hence change the focus
//     const handleOnInput = (e) => {
//         if (isInputValueValid(e.target.value)) {
//             focusNextInput();
//         } else {
//             // This is a workaround for dealing with keyCode "229 Unidentified" on Android.
//
//             if (!props.isInputNum) {
//                 const {nativeEvent} = e;
//
//                 if (nativeEvent.data === null && nativeEvent.inputType === 'deleteContentBackward') {
//                     e.preventDefault();
//                     changeCodeAtFocus('');
//                     focusPrevInput();
//                 }
//             }
//         }
//     };
//
//     const renderInputs = () => {
//         const {activeInput} = state;
//         const {
//             numInputs,
//             focusStyle,
//             separator,
//             isDisabled,
//             disabledStyle,
//             hasErrored,
//             errorStyle,
//             shouldAutoFocus,
//             isInputNum,
//             isInputSecure,
//             className,
//         } = props;
//
//         const inputs = [];
//         const otp = getOtpValue();
//         const placeholder = getPlaceholderValue();
//         const dataCy = props['data-cy'];
//         const dataTestId = props['data-testid'];
//         const notActiveStyle = {
//             width: '44px',
//             height: "44px",
//             margin: "8px",
//             borderRadius: '5px',
//             boxShadow: 'none',
//             outline: 'none',
//             border: '1px solid',
//             borderColor: theme.palette.background.button,
//             fontSize: "20px",
//             backgroundColor: theme.palette.background.defaultSecondary,
//             color: theme.palette.mode === 'dark' ? 'black' : 'white'
//         }
//         const activeStyle = {
//             width: '44px',
//             height: "44px",
//             margin: "8px",
//             borderRadius: '5px',
//             boxShadow: 'none',
//             outline: 'none',
//             border: '1px solid',
//             borderColor: theme.palette.background.button,
//             fontSize: "20px",
//             backgroundColor: theme.palette.background.button,
//             color: theme.palette.mode === 'dark' ? 'black' : 'white'
//
//         }
//         for (let i = 0; i < numInputs; i++) {
//             inputs.push(
//                 <SingleOtpInput
//                     placeholder={placeholder && placeholder[i]}
//                     key={i}
//                     index={i}
//                     focus={activeInput === i}
//                     value={otp && otp[i]}
//                     onChange={handleOnChange}
//                     onKeyDown={handleOnKeyDown}
//                     onInput={handleOnInput}
//                     onPaste={handleOnPaste}
//                     onFocus={(e) => {
//                         setState({activeInput: i});
//                         e.target.select();
//                     }}
//                     onBlur={() => {
//                     }}
//                     separator={separator}
//                     inputStyle={i <= activeInput ? activeStyle : notActiveStyle}
//                     focusStyle={focusStyle}
//                     isLastChild={i === numInputs - 1}
//                     isDisabled={isDisabled}
//                     disabledStyle={disabledStyle}
//                     hasErrored={hasErrored}
//                     errorStyle={errorStyle}
//                     shouldAutoFocus={shouldAutoFocus}
//                     isInputNum={isInputNum}
//                     isInputSecure={isInputSecure}
//                     className={className}
//                     data-cy={dataCy && `${dataCy}-${i}`}
//                     data-testid={dataTestId && `${dataTestId}-${i}`}
//                 />
//             );
//         }
//
//         return inputs;
//     };
//
//
//     const {containerStyle} = props;
//
//     return (
//         <div
//             style={Object.assign({display: 'flex'}, isStyleObject(containerStyle) && containerStyle)}
//             className={!isStyleObject(containerStyle) ? containerStyle : ''}
//         >
//             {renderInputs()}
//         </div>
//     );
//
// }
//
// export default OtpInput;