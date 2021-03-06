import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import Link from '../link';
import Logo from '../logo';
import RoundedIconButton from '../rounded_icon_button';
import Grid from '../grid';
import tesco from './../../assets/images/tesco.svg';
import Button from 'components/button';
import { Nav, NavItem, DropdownButton, MenuItem } from 'react-bootstrap';

function renderBackLink(backLink) {
  return backLink ?
    <Link
      href={backLink.href}
      arrow="left"
      className="ui-component__header__content__back-link"
    >
      {backLink.text}
    </Link> :
    null;
}

function renderUtilityLinks(links, hasIcons) {
  return (
    links.map((link, i) =>
      <li key={i}>
        <Link href={link.href} icon={hasIcons ? link.icon : ''}>
          {link.text}
        </Link>
      </li>
    )
  );
}

class Header extends Component {

  static propTypes = {
    links: PropTypes.arrayOf(Link.PropType),
    backLink: Link.PropType,
    logo: PropTypes.object,
    classes: PropTypes.string,
    contentClass: PropTypes.string,
    skipNavigationText: PropTypes.string,
    children: PropTypes.node,
    onMenuOpen: PropTypes.func,
    onMenuClose: PropTypes.func,
  };

  static defaultProps = {
    links: [
      { text: 'Login', icon: 'login', href: 'http://dvcmpweb00001uk.dev.global.tesco.org/login/' },
      { text: 'Reporting', icon: 'reporting', href: 'http://dvcmpweb00001uk.dev.global.tesco.org:81/sales/executive/' },
      { text: 'Pricing', icon: 'pricing', href: 'http://dvcmpweb00001uk.dev.global.tesco.org:83/pricing/home' },
      { text: 'Ranging', icon: 'ranging', href: 'http://dvcmpweb00001uk.dev.global.tesco.org:82/ranging' },
      { text: 'Scenario Comparison', icon: 'scenario_compare', href: 'http://dvcmpweb00001uk.dev.global.tesco.org:86/scenario/compare' },
      { text: 'Tesco.com', icon: 'home', href: 'http://www.tesco.com/' },
      { text: 'Contact us', icon: 'telephone', href: 'http://www.tesco.com/help/contact/' },
      { text: 'Help', icon: 'help', href: 'http://www.tesco.com/help/' }
    ],
    logo: {
      href: 'http://www.tesco.com',
      imageSrc: tesco,
      altText: 'Tesco logo',
    },
    classes: '',
  };

  constructor(props) {
    super(props);

    this.state = {
      mobileMenuVisible: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      mobileMenuVisible: !this.state.mobileMenuVisible,
    }, () => {
      const menuOpen = this.state.mobileMenuVisible;
      const funcName = `onMenu${menuOpen ? 'Open' : 'Close'}`;

      if (typeof this.props[funcName] === 'function') {
        this.props[funcName]();
      }
    });
  }

  renderMobileMenu() {
    const mobileMenuClasses = classNames('ui-component__mobile-menu', {
      show: this.state.mobileMenuVisible,
    });

    const props = {
      tabIndex: this.state.mobileMenuVisible ? '' : '-1',
      'aria-hidden': !this.state.mobileMenuVisible,
      'aria-live': 'polite',
    };

    return (
      <div className={mobileMenuClasses} {...props}>
        <div className="ui-component__mobile-menu__header">
          <button
            className="ui-component__icon--close_round"
            onClick={this.handleClick}
          >
            <span>Close</span>
          </button>
        </div>
        <div className="ui-component__mobile-menu__content-wrapper">
          <div className="ui-component__mobile-menu__content">
            <div className="ui-component__mobile-menu__content--back-links">
              <ul>
                <li>
                  {renderBackLink(this.props.backLink)}
                </li>
              </ul>
            </div>
            <div
              className={
                'ui-component__mobile-menu__content--utility-bar-contents'
              }
            >
              <ul>
                {renderUtilityLinks(this.props.links, true)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const classes = classNames(
      'ui-component__header',
      this.props.classes
    );
    const { contentClass, links, logo, skipNavigationText } = this.props;

    const utilityClasses = classNames(
      'ui-component__utility_bar',
      { 'visibility-hidden': this.state.mobileMenuVisible }
    );

    const contentClasses = classNames(
      'ui-component__header__content',
      { 'visibility-hidden': this.state.mobileMenuVisible }
    );

    return (
      <div className={classes}>
        {this.props.children}
        <div className={utilityClasses}>
          <Grid>
            <div className={contentClass}>
              <Link href="#logo" className="ui-component__skip-navigation">
                {skipNavigationText || 'Skip navigation'}
              </Link>
              <ul className="ui-component__utility-list">{
                renderUtilityLinks(links, false)
              }</ul>
            </div>
          </Grid>
        </div>
        <div className={contentClasses}>
          <Grid>
            <div className="Row" >
              <div className="col-md-2">
                {
                  (logo,
                      <div className="ui-component__header__tesco-logo">
                        <Logo {...logo} id="logo" />
                      </div>
                  )
                }
              </div>
              {/*<div className="ui-component__header__content--right">*/}
              {/*<RoundedIconButton icon="menu" onClick={this.handleClick} label="Menu" />*/}
              {/*</div>*/}
              <div className="col-md-8">
                <Nav bsStyle="tabs" className="tabsCustom" style={{marginWidth:"5%"}}>
                  <NavItem className="tabsNavPanelList" href="http://dvcmpweb00001uk.dev.global.tesco.org:82/ranging/negotiation">Scenario Tracker</NavItem>
                  <NavItem className="tabsNavPanelList" href="http://dvcmpweb00001uk.dev.global.tesco.org:82/ranging/delist/">Delist Impact</NavItem>
                  <NavItem className="tabsNavPanelList" href="http://dvcmpweb00001uk.dev.global.tesco.org:82/ranging/npd/">NPD</NavItem>
                  <NavItem className="tabsNavPanelLogoutList" style={{ float: 'right', marginTop: '-8px' }}>
                    <span>
                      <span>
                      <DropdownButton className="	glyphicon glyphicon-user"
                                      pullRight style={{ backgroundColor: 'transparent', borderColor: 'transparent', color: '#00539f', fontSize:"18px"}}>
                        <MenuItem style={{textDecoration:"none"}}><span ><b>Hi,User</b></span></MenuItem>
                        <MenuItem onClick={() => {
                          localStorage.clear();
                          const getCookie = (name) => {
                            const value = `; ${document.cookie}`;
                            const parts = value.split(`; ${name}=`);
                            if (parts.length === 2) {
                              return parts.pop().split(';').shift();
                            }
                          };
                          const token = getCookie('token');
                          const hostName = 'dvcmpweb00001uk.dev.global.tesco.org';
                          const hostPort = '80';
                          document.cookie = 'token'.concat(`=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=${hostName};Path=/;`);
                          document.cookie = 'buyer'.concat(`=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=${hostName};Path=/;`);
                          document.cookie = 'buying_controller'.concat(`=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=${hostName};Path=/;`);
                          document.cookie = 'category_director'.concat(`=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=${hostName};Path=/;`);
                          document.cookie = 'commercial_director'.concat(`=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=${hostName};Path=/;`);
                          document.cookie = 'designation'.concat(`=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=${hostName};Path=/;`);
                          document.cookie = 'email_id'.concat(`=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=${hostName};Path=/;`);
                          document.cookie = 'first_name'.concat(`=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=${hostName};Path=/;`);
                          document.cookie = 'junior_buyer'.concat(`=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=${hostName};Path=/;`);
                          document.cookie = 'key'.concat(`=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=${hostName};Path=/;`);
                          document.cookie = 'last_name'.concat(`=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=${hostName};Path=/;`);
                          document.cookie = 'login_timestamp'.concat(`=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=${hostName};Path=/;`);
                          document.cookie = 'middle_name'.concat(`=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=${hostName};Path=/;`);
                          document.cookie = 'product_sub_group_description'.concat(`=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=${hostName};Path=/;`);
                          document.cookie = 'token'.concat(`=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=${hostName};Path=/;`);
                          document.cookie = 'tpx_id'.concat(`=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=${hostName};Path=/;`);
                          document.cookie = 'user'.concat(`=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=${hostName};Path=/;`);
                          window.location = `http://${hostName}:${hostPort}/login/`;

                        }}>Logout</MenuItem>
                      </DropdownButton></span>
                    </span></NavItem>
                </Nav>
              </div>
            </div>
          </Grid>
        </div>
        {this.renderMobileMenu()}
      </div>
    );
  }
}

export default Header;
