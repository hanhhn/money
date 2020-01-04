import React, {Component} from 'react';
import {connect} from 'react-redux';
import OutgoingScreen from '../screens/outgoing.screen';

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

    return <OutgoingScreen {...props} />;
  }
}

export default connect()(MainContainer);
