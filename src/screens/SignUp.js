import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import routes from "./routes";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import { FaLink } from "../components/shared";
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FaLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;
const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;
function SingUp() {
  const history = useHistory();
  const onCompleted = (data) => {
    const { username, password } = getValues();
    const {
      createAccount: { ok },
    } = data;
    if (!ok) {
      return;
    }
    history.push(routes.home, {
      message: "성공했습니다. 로그인 해주세요",
      username,
      password,
    });
  };
  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });
  const { register, handleSubmit, formState, getValues } = useForm({
    mode: "onChange",
  });
  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    createAccount({
      variables: {
        ...data,
      },
    });
  };
  return (
    <AuthLayout>
      <PageTitle title="Sign Up" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Subtitle>회원가입을 하면 해당 서비스를 이용 할 수 있다.</Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("firstName", { required: "First is required" })}
            type="text"
            placeholder="FirstName"
          />
          <Input {...register("lastName")} type="text" placeholder="LastName" />
          <Input
            {...register("username", { required: "Id is required" })}
            type="text"
            placeholder="Id"
          />
          <Input
            {...register("email", { required: "Email is required" })}
            type="text"
            placeholder="E-mail"
          />

          <Input
            {...register("password", { required: "Password Name is required" })}
            type="password"
            placeholder="Password"
          />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Sign In"}
            placeholder="로그인"
            disabled={!formState.isValid || loading}
          />
        </form>
      </FormBox>
      <BottomBox
        cta="계정이 있으신가요?"
        linkText="로그인"
        link={routes.home}
      />
    </AuthLayout>
  );
}
export default SingUp;
