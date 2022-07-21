import React from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native'
import {connect} from 'react-redux'
import {SIZES, COLORS, icons, FONTS} from '../constants'

const ProfileValue = ({appTheme, icon, lable, value, onPress}) => {
  return (
    <TouchableOpacity
        style={{
            flexDirection: 'row',
            height: 80,
            alignItems: 'center'
        }}
        onPress={onPress}
    >
        <View
            style={{
                height: 40,
                width:40,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
                backgroundColor: appTheme.backgroundColor3
            }}
        >
            <Image
            source={icon}
            resizeMode= 'contain'
            style={{
                width: 25,
                height: 25,
                tintColor: COLORS.primary
            }}
            />
        </View>
        <View
            style={{
                flex: 1,
                marginLeft: SIZES.radius
            }}
        >
            {lable && 
                <Text
                style={{
                    ...FONTS.body3,
                    color: COLORS.gray30
                }}
                >
                    {lable}
                </Text>
            }
            <Text
                style={{
                    color: appTheme?.textColor,
                    ...FONTS.h3,
                }}
                >
                    {value}
                </Text>
        </View>
        <Image
        source={icons.right_arrow}
        style={{
            width: 15,
            height: 15,
            tintColor: appTheme?.tintColor
        }}
        />
    </TouchableOpacity>
  )
}

function mapStateToProps(state){
    return{
        appTheme: state.appTheme
    }
}
function mapDispatchToProps(dispatch){
    return{
    }
}
export default connect(mapStateToProps ,mapDispatchToProps )(ProfileValue)