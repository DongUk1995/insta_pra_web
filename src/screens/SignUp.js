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

function SingUp() {
  return (
    <AuthLayout>
      <PageTitle title="SignUp" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Subtitle>회원가입을 하면 해당 서비스를 이용 할 수 있다.</Subtitle>
        </HeaderContainer>
        <form>
          <Input type="text" placeholder="휴대폰번호 또는 이메일" />
          <Input type="password" placeholder="아이디" />
          <Input type="password" placeholder="이름" />
          <Input type="password" placeholder="비밀번호" />
          <Button type="submit" placeholder="로그인" />
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
