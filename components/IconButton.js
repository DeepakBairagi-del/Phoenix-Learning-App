import React from 'react'
import {COLORS} from '../constants'
import {TouchableOpacity, Image} from 'react-native'
const IconButton = ({containerStyle, icon, iconStyle, onPress}) => {
  return (
        <TouchableOpacity
            style={{
                ...containerStyle
            }}
            onPress={onPress}
        >
            <Image
            source={icon}
            resizeMode='contain'
            style={{
                width:30,
                height:30,
                tintColor: COLORS.white,
                ...iconStyle
            }}
            />
        </TouchableOpacity>
  )
}

export default IconButton