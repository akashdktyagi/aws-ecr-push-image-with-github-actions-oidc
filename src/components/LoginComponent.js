import React, {useState, useMemo, useEffect} from 'react';
import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import ButtonComponent from '../commoncontrols/ButtonComponent';
import {useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';

function LoginComponent() {
    let navigate = useNavigate();
    const [loginid, setLoginid] = useState("");
    const [inputdata, setInputData] = useState(false);
    const [userValidation, setUserValidation] = useState({
        errorcheck: false,
        errormessage: ""
    });
    
    const dispatchLogin = useDispatch();

    // const loginStatus = useSelector(state => state.loginReducer);

    const logincheckuser = (e) =>{
        if(e.target.value !== ""){
            setUserValidation({
                ...userValidation,
                errorcheck: false
            })
            setLoginid(e.target.value)
            setInputData(true)
        }else{
            setLoginid("")
        }
    }

    const loginuser = () =>{
        // debugger;
        if(loginid === "") {
            setUserValidation({
                ...userValidation,
                errorcheck: true,
                errormessage: "Please enter valid ID"
            })
            return false
        }else{
            let userdatapath = "../users.json"
            fetch(userdatapath, {
                method: "GET",
                headers: {
                    'Content-type': 'application/json'
                }
            }).then(response => response.json())
            .then(res => {
                let usercatch = res.filter(data => data.userid === loginid);
                if(usercatch.length !== 0){
                    // debugger
                    setLoginid("");
                    dispatchLogin({type: 'login'});
                    sessionStorage.setItem("userdetails", JSON.stringify(usercatch[0]));
                    sessionStorage.setItem("userlogin", true);
                    navigate("/dashboard")
                }else if(usercatch.length === 0){
                    setUserValidation({
                        ...userValidation,
                        errorcheck: true,
                        errormessage: "User does not exists"
                    })
                }
            }).catch(error => console.log("User not available", error))
        }
    }

    // const memoisedfunction = useMemo(() => loginuser, []);

    return (
        <>
            <h3 className='my-3'>Welcome !</h3>
            <Container>
                <Form className='w-50 text-center container-fluid'>
                    <Form.Group className="mb-3" controlId="enterID">
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter ID" onChange={(e)=> logincheckuser(e)} value={loginid} />
                        {userValidation.errorcheck ? <div className='text-danger my-3'>
                            {userValidation.errormessage}
                        </div> : ''}
                    </Form.Group>
                    <Form.Group className='mb-3 mw-100' controlId="buttonID">
                        <ButtonComponent variant={'primary'} btnName={'Login'} triggerClick={loginuser} rowclass={'mt-3'} />
                    </Form.Group>
                </Form>
            </Container>
        </>
    );
}

export default LoginComponent
