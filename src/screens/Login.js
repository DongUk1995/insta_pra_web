import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import routes from "./routes";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import Separator from "../components/auth/Separator";
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";
import { gql, useMutation } from "@apollo/client";
import { logUserIn } from "../apollo";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const FascebookLogin = styled.div`
  color: #285285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const Notification = styled.div`
  color: green;
`;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

function Login() {
  const location = useLocation(); // sign에 데이터 값을 가져 올 수 있다. 예를 들어 회원가입 완료 로그인 하세요라는 경고문을 사인에서 보내서 여기서 받아서 출력 할 수 있고,
  // 만든 아이디와 비밀번호를 로그인 창에 바로 입력 할 수 있게 defaultValues값을 통해 가져옴
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: location?.state?.username || "",
      password: location?.state?.password || "",
    },
  });
  const onCompleted = (data) => {
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error,
      });
    }
    if (token) {
      logUserIn(token);
    }
  };
  const [login, { loading }] = useMutation(LOGIN_MUTATION, { onCompleted });
  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    const { username, password } = getValues();
    login({
      variables: { username, password },
    });
  };
  const clearLoginError = () => {
    clearErrors("result");
  };

  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <Notification>{location?.state?.message}</Notification>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("username", {
              required: "사용자 이름 또는 이메일 입력하세요.",
              minLength: {
                value: 5,
                message: "5글자 이상 작성하세요.",
              },
            })}
            onChange={clearLoginError}
            type="text"
            placeholder="전화번호, 사용자 이름 또는 이메일"
            $hasError={Boolean(errors?.username?.message)}
          />
          <FormError message={errors?.username?.message} />
          <Input
            {...register("password", {
              required: "비밀번호를 입력 하세요.",
              message: "비밀번호를 입력하세요.",
            })}
            onChange={clearLoginError}
            type="password"
            placeholder="비밀번호"
            $hasError={Boolean(errors?.password?.message)}
          />
          <FormError message={errors?.password?.message} />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Log In"}
            placeholder="로그인"
            disabled={!isValid || loading}
          />
          <FormError message={errors?.result?.message} />
        </form>
        <Separator />
        <FascebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Facebook으로 로그인</span>
        </FascebookLogin>
      </FormBox>
      <BottomBox
        cta="계정이 없으신가요?"
        linkText="가입하기"
        link={routes.signUp}
      />
    </AuthLayout>
  );
}
export default Login;
