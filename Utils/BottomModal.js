import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Modal from 'react-native-modal';

export default class BottomModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isVisible : this.props.isVisible == null? false : this.props.isVisible,  
        }
    }

    toggleVisible = () => {
        this.setState({isVisible: !this.state.isVisible});
    }

    render() {
        return (        
            <Modal 
                isVisible={this.props.isVisible} 
                onSwipeComplete={()=>{
                    this.close;
                    this.toggleVisible()
                }}        
                swipeDirection={['down']}
                style={{ justifyContent: 'flex-end', margin: 0,}}
            >
            <View style={MainStyles.content}>
                {this.props.children}
            </View>
        </Modal>
        );
    }

}

const MainStyles = StyleSheet.create({

    content: {
        backgroundColor: 'white',
        padding: 20,
        height: 300,
        borderRadius: 20,
        width: '100%',    
    },

});
