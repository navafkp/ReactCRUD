import React, { useEffect } from 'react'
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBTypography } from 'mdb-react-ui-kit';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SETUSER, LOGIN } from '../../Redux/ActionType'; 
const Home = () => {
    // const [user, setUserData] = useState({ first_name: "", last_name: "", email: "", phone: ""});
    const token = useSelector(state => state.token)
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        (async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/user/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token.jwt}`
                    },
                    credentials: 'include'
                });
    

                const data = await response.json();
                
                const payload = {
                    firstname: data.first_name,
                    lastname:data.last_name,
                    email:data.email,
                    phone:data.phone,
                }
               
                dispatch({
                    type:SETUSER,
                    users:payload
                })
                // setUserData(data);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

            } catch (error) {
                console.error('Error while fetching user data:', error);
            }
        })();
    }, [token, dispatch]);

    
    



    const handleLogout = (e) => {
        console.log("sdsd")
        dispatch({
            type:LOGIN,
            token: '',

        })
        navigate('/')

    }

    return (
        <div>
           {/* <Link to='/logout'>Logout</Link> */}
           <button onClick={(e)=>handleLogout(e)}>Logout</button>
            <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
                <MDBContainer className="py-5 h-100">
                    <MDBRow className="justify-content-center align-items-center h-100">
                        <MDBCol lg="6" className="mb-4 mb-lg-0">
                            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                           
                                <MDBRow className="g-0">

                                
                                     
                                    <MDBCol md="3" className="gradient-custom text-center text-white"
                                        style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                                       

{/*  */}


                                    </MDBCol>
                                    {users && (
                                        <MDBCardBody className="p-4">
                                        
                                        <MDBTypography tag="h6">User Information</MDBTypography>
                                        <hr className="mt-0 mb-4" />

                                        <MDBRow className="pt-1">
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">First name</MDBTypography>
                                                <MDBCardText className="text-muted">{users.firstname}</MDBCardText>
                                            </MDBCol>

                                             <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">Last name</MDBTypography>
                                                <MDBCardText className="text-muted">{users.lastname}</MDBCardText>
                                            </MDBCol>

                                        </MDBRow>

                                         <MDBTypography tag="h6">User Information</MDBTypography>
                                         <hr className="mt-0 mb-4" />

                                        <MDBRow className="pt-1">
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">Email</MDBTypography>
                                                <MDBCardText className="text-muted">{users.email}</MDBCardText>
                                            </MDBCol>

                                             <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">Phone</MDBTypography>
                                                <MDBCardText className="text-muted">{users.phone}</MDBCardText>
                                            </MDBCol>

                                        </MDBRow>




                                    </MDBCardBody>
                                  
                                  )}
                                        
                                  
                                    <MDBCol md="9">
                                   
                                    </MDBCol>
                                </MDBRow>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
        </div>
    )
}

export default Home