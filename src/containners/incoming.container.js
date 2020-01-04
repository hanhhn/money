import React, {Component} from 'react';
import {connect} from 'react-redux';
import IncomingScreen from '../screens/incoming.screen';

class MainContainer extends Component {
  constructor(props) {
    super(props);
  }

  goBack(navigation) {
    navigation.goBack();
  }

  render() {
    const props = {
      goBack: () => this.goBack(this.props.navigation),
    };

    return <IncomingScreen {...props} />;
  }
}

export default connect()(MainContainer);
