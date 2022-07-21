import React from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Animated
} from 'react-native'
import {connect} from 'react-redux'
import {COLORS, SIZES, FONTS} from '../constants'

const ProfileRadioButton = ({appTheme, icon, lable, isSelected, onPress}) => {
    const radioAnimated = React.useRef(new Animated.Value(0)).current;
    const circleColorAnimated = radioAnimated.interpolate({
        inputRange: [0, 17],
        outputRange: [COLORS.gray40, COLORS.primary]
    })
    const lineColorAnimated = radioAnimated.interpolate({
        inputRange: [ 0, 17],
        outputRange: [COLORS.additionalColor4, COLORS.additionalColor13]
    })
    React.useEffect(()=> {
        if(isSelected){
            Animated.timing(radioAnimated,{
                toValue: 17,
                duration: 300,
                useNativeDriver: false
            }).start()
        }else{
            Animated.timing(radioAnimated,{
                toValue: 0,
                duration: 300,
                useNativeDriver: false
            }).start()
        }
    },[isSelected])
  return (
    <View
        style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 80
        }}
    >
        <View
            style={{
                height: 40,
                width:40,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
                backgroundColor: appTheme?.backgroundColor3
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
            
            <Text
                style={{
                    color: appTheme?.textColor,
                    ...FONTS.h3,
                }}
                >
                    {lable}
                </Text>
        </View>
        <TouchableOpacity
            style={{
                width:40,
                height:40,
                alignItems: 'center',
                justifyContent: 'center'
            }}
            onPress={onPress}
        >
            <Animated.View
                style={{
                    width: '100%',
                    height: 5,
                    borderRadius: 3,
                    backgroundColor: lineColorAnimated
                }}
            />
            <Animated.View
                style={{
                    position: 'absolute',
                    left: radioAnimated,
                    borderRadius: 15,
                    height: 25,
                    width: 25,
                    borderWidth: 5,
                    borderColor: circleColorAnimated,
                    backgroundColor: appTheme?.backgroundColor1
                }}
            />

        </TouchableOpacity>
    </View>
  )
}

function mapStateToProps(state){
    return{
        appTheme: state.appTheme,
    }
}
function mapDispatchToProps(dispatch){
    return{
    }
}
export default connect(mapStateToProps ,mapDispatchToProps )(ProfileRadioButton)