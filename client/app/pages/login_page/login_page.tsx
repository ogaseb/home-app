import { useAppDispatch } from "@hooks/hooks";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { userLogin } from "@stores/user_store/user_store";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: calc(100vh - ${(props) => props.theme.appBarHeight} - 26px);
`;

const LoginPage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	return (
		<Wrapper>
			<GoogleOAuthProvider
				clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}
			>
				<GoogleLogin
					onSuccess={async (credentialResponse) => {
						try {
							await dispatch(userLogin({ credentialResponse }));
							navigate("/");
						} catch (e) {
							/* empty */
						}
					}}
					onError={() => console.log("Login Failed")}
				/>
			</GoogleOAuthProvider>
		</Wrapper>
	);
};

export default LoginPage;
