import React, { Component } from 'react';
import {
  Menu,
  Container,
  Visibility,
  Icon,
  Dropdown,
  Header
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { menuFixed: false, activeItem: 'login' };
  }

  stickTopMenu = () => this.setState({ menuFixed: true });
  unStickTopMenu = () => this.setState({ menuFixed: false });

  logout = () => {
    this.props.history.push('/');
  };

  guestMenu = () => {
    const { location, authenticated } = this.props;

    return (
      <Container text>
        <Menu.Item>
          <Link to="/">Poll App</Link>
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/login"
          color="blue"
          position="right"
          active={location.pathname === '/login'}
        >
          Login
        </Menu.Item>
        <Menu.Item
          as={Link}
          color="blue"
          to="/signup"
          name="/signup"
          active={location.pathname === '/signup'}
        >
          Signup
        </Menu.Item>
      </Container>
    );
  };

  userMenu = () => {
    const { location, authenticated } = this.props;

    return (
      <Container text>
        <Menu.Item>
          <Link to="/">Poll App</Link>
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/"
          color="blue"
          position="right"
          active={location.pathname === '/'}
        >
          <Icon name="home" />
        </Menu.Item>
        <Menu.Item
          as={Link}
          color="blue"
          to="/newpoll"
          active={location.pathname === '/newpoll'}
        >
          <Icon name="chart bar" />
        </Menu.Item>
        <Menu.Item color="blue" active={location.pathname === '/signup'}>
          <Dropdown trigger={<Icon name="user" />}>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Header content="Ningning Ni" subheader="@guangtoutou" />
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item text="Profile" />
              <Dropdown.Item text="Logout" onClick={this.logout} />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Container>
    );
  };

  render() {
    const { menuFixed, activeItem } = this.state;
    const { location, authenticated } = this.props;

    return (
      <div>
        <Visibility
          onBottomPassed={this.stickTopMenu}
          onBottomVisible={this.unStickTopMenu}
          once={false}
        >
          <Menu pointing secondary fixed={menuFixed ? 'top' : null} borderless>
            {authenticated ? this.userMenu() : this.guestMenu()}
          </Menu>
        </Visibility>
      </div>
    );
  }
}
