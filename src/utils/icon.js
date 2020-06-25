import React from 'react';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import FeatherIcon from 'react-native-vector-icons/Feather'
export const mailIcon = <MaterialCommunityIcon
        name='email-outline'
        color='#FFFFFF'
        size={34} />

export const KeyIcon = <FeatherIcon
        name='key'
        color='#FFFFFF'
        size={34} />

export const ScanQRIcon = ({
        color, size }) => {
        return (<MaterialCommunityIcon
                name='qrcode-scan'
                color={color}
                size={30} />)
}
