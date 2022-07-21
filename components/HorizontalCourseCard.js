import React from 'react'
import {
    View,
    Text,
    Image,
    ImageBackground,
    TouchableOpacity
} from 'react-native'
import {IconLable} from '../components'
import { SIZES, COLORS, FONTS, icons} from '../constants'
import {connect} from 'react-redux'

const HorizontalCourseCard = ({onPress, appTheme,containerStyle, course}) => {
  return (
    <TouchableOpacity
        style={{
            flexDirection: 'row',
            ...containerStyle
        }}
        onPress = {onPress}
    >
        <ImageBackground
            source={course.thumbnail}
            resizeMode= 'cover'
            style={{
                width:130,
                height:130,
                marginBottom: SIZES.radius
            }}
            imageStyle={{
                borderRadius: SIZES.radius
            }}
        >
            <View
            style={{
                position: 'absolute',
                top:10,
                right: 10,
                width: 30,
                height: 30,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
                backgroundColor: appTheme?.backgroundColor1
            }}
            >
                <Image
                source={icons.favourite}
                resizeMode= 'contain'
                style={{
                    width:20,
                    height: 20,
                    tintColor: course.is_favourite ? COLORS.secondary : COLORS.additionalColor4
                }}
                />
            </View>
        </ImageBackground>
        <View
            style={{
                flex: 1,
                marginLeft: SIZES.base
            }}
        >
            <Text
                style={{
                    color:appTheme?.textColor,
                    ...FONTS.h3,
                    fontSize: 18
                }}
            >
                {course.title}
            </Text>

            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: SIZES.base
                }}
            >
                <Text style={{color: appTheme?.textColor5,...FONTS.body4}}>By {course.instructor}</Text>
                <IconLable
                    icon={icons.time}
                    lable={course.duration}
                    containerStyle={{
                        marginLeft: SIZES.base
                    }}
                    iconStyle={{
                        width: 15,
                        height: 15
                    }}
                    lableStyle={{
                        ...FONTS.body4
                    }}
                />
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: SIZES.base
                }}
            >
                <Text style={{...FONTS.h2, color: COLORS.primary}}> $ {course.price.toFixed(2)}</Text>
                <IconLable
                    icon={icons.star}
                    lable={course.ratings}
                    containerStyle={{
                        marginLeft: SIZES.base
                    }}
                    iconStyle={{
                        width:15,
                        height: 15,
                        tintColor: COLORS.primary2
                    }}
                    lableStyle={{
                        marginLeft: 5,
                        color: appTheme?.textColor,
                        ...FONTS.h3
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
export default connect(mapStateToProps ,mapDispatchToProps )(HorizontalCourseCard)
