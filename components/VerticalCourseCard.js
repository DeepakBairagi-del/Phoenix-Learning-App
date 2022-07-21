import React from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native'
import {SIZES, COLORS, FONTS, icons } from '../constants'
import IconLable from './IconLable'
import {connect } from 'react-redux'
const VerticalCourseCard = ({appTheme,containerStyle, course, onPress}) => {
  return (
    <TouchableOpacity
        style={{
            width: 270,
            ...containerStyle
        }}   
        onPress={onPress}
    >
        <Image
        source={course.thumbnail}
        resizeMode= 'cover'
        style={{
            width: '100%',
            height: 150,
            marginBottom: SIZES.radius,
            borderRadius: SIZES.radius

        }}
        />

        <View
        style={{
            flexDirection: 'row'
        }}
        >
            <View
            style={{
                width: 45,
                height: 45,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 25,
                backgroundColor: COLORS.primary 
            }}
            >
                <Image
                source={icons.play}
                resizeMode= 'contain'
                style={{
                    width: 20,
                    height: 20
                }}
                />
            </View>

            <View
            style={{
                flexShrink : 1,
                paddingHorizontal: SIZES.radius
            }}
            >
                <Text
                style={{
                    flex:1,
                    color: appTheme?.textColor,
                    ...FONTS.h3,
                    fontSize: 18
                }}
                >
                    {course.title}
                </Text>

                <IconLable
                icon={icons.time}
                lable={course.duration}
                containerStyle={{
                    marginTop: SIZES.base
                }}
                />
            </View>
        </View>
    </TouchableOpacity>
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
export default connect(mapStateToProps ,mapDispatchToProps )(VerticalCourseCard)
