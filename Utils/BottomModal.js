import React, { Component } from 'react'
import {
    StyleSheet,
    View,
} from 'react-native';
import Modal from 'react-native-modal';


export default class BottomModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isVisible : false,  
        }
    }

    render() {
        return (        
            <Modal 
                isVisible={this.props.isVisible} 
                onSwipeComplete={()=>{
                    this.close;
                    if(this.props.toggleModal() != null) {
                        this.props.toggleModal()
                    }
                    this.setState({isVisible: false})
                }}
                swipeDirection={['down']}
                style={{ justifyContent: 'flex-end', margin: 0,}}
            >
            <View style={{...MainStyles.content, ...this.props.style}}>
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
        height: 350,
        borderRadius: 20,
        width: '100%',    
    },

});
