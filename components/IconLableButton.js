import { Image, Text, TouchableOpacity } from 'react-native'
import { FONTS, SIZES } from '../constants'
import React from 'react'

const IconLableButton = ({containerStyle, icon, iconStyle, lable, lableStyle, onPress}) => {
  return (
    <TouchableOpacity
        style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            ...containerStyle
        }}
        onPress={onPress}
    >
        <Image
            source={icon}
            resizeMode= 'contain'
            style={{
                width: 20,
                height: 20,
                ...iconStyle
            }}
        />
        <Text style={{marginLeft: SIZES.base, ...FONTS.body3, ...lableStyle}}>{lable}</Text>
    </TouchableOpacity>
  )
}

export default IconLableButton