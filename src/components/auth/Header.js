import { useReactiveVar } from "@apollo/client";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { isLoggedInvar } from "../../apollo";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faCompass } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import routes from "../../screens/routes";
import Avatar from "../Avatar";
import useUser from "../../hook/useUser";

const SHeader = styled.header`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgColor};
  padding: 18px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  max-width: 930px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const IconsContainer = styled.div`
  display: flex;
  align-items: center;
`;
const Column = styled.div``;

const Icon = styled.span`
  margin-left: 15px;
`;
const Btn = styled.span`
  background-color: ${(props) => props.theme.accent};
  color: white;
  border-radius: 4px;
  padding: 5px 15px;
  color: white;
  font-weight: 600;
`;
function Header() {
  const isLoggedIn = useReactiveVar(isLoggedInvar);
  const { data } = useUser();
  return (
    <SHeader>
      <Wrapper>
        <Column>
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </Column>
        <Column>
          {isLoggedIn ? (
            <IconsContainer>
              <Icon>
                <FontAwesomeIcon icon={faHome} size="lg" />
              </Icon>
              <Icon>
                <FontAwesomeIcon icon={faCompass} size="lg" />
              </Icon>
              <Icon>
                <Avatar url={data?.me?.avatar} />
              </Icon>
            </IconsContainer>
          ) : (
            <Link href={routes.home}>
              <Btn>Login</Btn>
            </Link>
          )}
        </Column>
      </Wrapper>
    </SHeader>
  );
}

export default Header;
