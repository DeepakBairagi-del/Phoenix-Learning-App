import React from 'react'
import {
    TouchableOpacity,
    Text,
    View,
    Image,
    StyleSheet
} from 'react-native'
import {SIZES, COLORS, FONTS} from '../constants'
import { SharedElement } from 'react-native-shared-element'

const CatagoryCard = ({sharedElementPrefix,onPress, catagory, containerStyle}) => {
  return (
    <TouchableOpacity
        style={{
            height: 150,
            width: 200,
            ...containerStyle
        }}
        onPress={onPress}
    >
        <SharedElement
            id= {`${sharedElementPrefix}-CatagoryCard-Bg-${catagory?.id}`}
            style={StyleSheet.absoluteFillObject}
        >
            <Image
                source={catagory?.thumbnail}
                resizeMode= 'cover'
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: SIZES.radius
                }}
            />
        </SharedElement>
        <View
            style={{
                position: 'absolute',
                bottom: 50,
                left: 5,
            }}
        >
            <SharedElement
            id={`${sharedElementPrefix}-CatagoryCard-Title-${catagory?.id}`}
            style={StyleSheet.absoluteFillObject}
            >
                <Text
                    style={{
                        position: 'absolute',
                        color: COLORS.white,
                        ...FONTS.h2
                    }}
                >
                    {catagory?.title}
                </Text>
            </SharedElement>
        </View>
    </TouchableOpacity>
  )
}

export default CatagoryCard