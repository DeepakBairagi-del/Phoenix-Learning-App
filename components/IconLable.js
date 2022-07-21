import React from 'react'
import {
    View,
    Text,
    Image
} from 'react-native'
import {FONTS, SIZES, COLORS} from '../constants'

const IconLable = ({containerStyle, icon, iconStyle, lable, lableStyle}) => {
  return (
    <View
    style={{
        flexDirection: 'row',
        alignItems: 'center',
        ...containerStyle
    }}
    >
        <Image
            source={icon}
            style={{
                width: 20,
                height:20,
                tintColor: COLORS.gray30,
                ...iconStyle
            }}
        />
        <Text
        style={{
            marginLeft: SIZES.base,
            color: COLORS.gray30,
            ...FONTS.body3,
            ...lableStyle
        }}
        >
            {lable}
        </Text>
    </View>
  )
}

export default IconLable