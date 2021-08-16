import React, { Component } from 'react'
import {View, Text} from 'react-native'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux' //have to learbn about this
import { fetchUser } from '../redux/actions/index'

export class Main extends Component {
    componentDidMount(){
        this.props.fetchUser();
    }
    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
              }}>
                <Text>User is LoggedIn</Text>
            </View>
        )
    }
}

const mapDispacthToProps = (dispatch) => bindActionCreators({fetchUser}, dispatch);

export default connect(null, mapDispacthToProps)(Main)
