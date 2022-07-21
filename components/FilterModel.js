import React from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import {SIZES, COLORS, FONTS, icons, constants} from '../constants'
import Animated,{
    interpolate,
    useAnimatedStyle,
    withDelay,
    withTiming
} from 'react-native-reanimated'
import {TextButton, TwoPointSlider} from '../components'
import { connect } from 'react-redux'

const ClassType = ({appTheme, containerStyle, classType, isSelected, onPress}) => {
    return(
        <TouchableOpacity
        style={{
            flex: 1,
            height: 100,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: SIZES.radius,
            borderRadius: SIZES.radius,
            borderWidth: 1,
            borderColor: isSelected ? appTheme?.backgroundColor9 : appTheme?.borderColor3,
            backgroundColor: isSelected ? appTheme?.backgroundColor9 : appTheme?.backgroundColor10,
            ...containerStyle
        }}
        onPress={onPress}
        >
            <Image
            source={classType.icon}
            resizeMode= 'contain'
            style={{
                width: 40,
                height: 40,
                tintColor: isSelected? COLORS.white : appTheme?.textColor3
            }}
            /> 
            <Text style={{ marginTop: SIZES.base, color: isSelected ? COLORS.white : appTheme?.textColor3, ...FONTS.h3}}>{classType.label}</Text>
        </TouchableOpacity>
    )
}

const ClassLevel =({appTheme, isSelected, onPress, classLevel, containerStyle, isLastItem}) => {
    return(
        <>
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    height: 50,
                    alignItems: 'center',
                    ...containerStyle
                }}
                onPress={onPress}
            >
                <Text
                    style={{
                        flex: 1,
                        color: appTheme?.textColor,
                        ...FONTS.body3
                    }}
                >
                    {classLevel.label}
                </Text>
                <Image
                source={isSelected? appTheme.checkIconOn : appTheme.checkIconOff}
                resizeMode= 'contain'
                style={{
                    width: 20,
                    height: 20
                }}
                />
            </TouchableOpacity>
            {!isLastItem && 
                <View
                style={{
                    height: 1,
                    width: '100%',
                    backgroundColor: COLORS.gray20
                }}
                />
            }
        </>
    )
}

const FilterModel = ({appTheme, filterModelSharedValue1, filterModelSharedValue2}) => {
    const [selectedClassType, setSelectedClassType] = React.useState('')
    const [selectedClassLevel, setSelectedClassLevel] = React.useState('')
    const [selectedCreatedWithin, setSelectedCreatedWithin] = React.useState('')

    const filterModelContainerAnimatedStyle = useAnimatedStyle(
        ()=> {
            return{
                opacity: interpolate(filterModelSharedValue1.value, [SIZES.height,0], [0,1]),
                transform: [
                    {
                        translateY: filterModelSharedValue1.value
                    }
                ]
            }
        }
    )
    const filterModelBgAnimatedStyle = useAnimatedStyle(
        ()=> {
            return{
                opacity: interpolate(filterModelSharedValue2.value, [SIZES.height,0], [0,1])
            }
        }
    )
    const filterModelContentAnimatedStyle = useAnimatedStyle(
        ()=> {
            return{
                opacity: interpolate(filterModelSharedValue2.value, [SIZES.height,0], [0,1]),
                transform: [
                    {
                        translateY: filterModelSharedValue1.value
                    }
                ]
            }
        }
    )
    function renderFooter(){
        return(
            <View
            style={{
                flexDirection: 'row',
                height: 50,
                marginBottom: 30,
                paddingHorizontal: SIZES.padding
            }}
            >
                <TextButton
                lable='Reset'
                contentContainerStyle={{
                    flex: 1,
                    borderRadius: SIZES.radius,
                    borderWidth: 1,
                    borderColor:appTheme?.borderColor2,
                    backgroundColor: null
                }}
                lableStyle={{
                    color: appTheme?.textColor,
                    ...FONTS.h3
                }}
                />
                <TextButton
                lable='Apply'
                contentContainerStyle={{
                    flex: 1,
                    marginLeft: SIZES.radius,
                    borderRadius: SIZES.radius,
                    borderWidth: 2,
                    borderColor: COLORS.primary,
                    backgroundColor: COLORS.primary
                }}
                lableStyle={{
                    color: COLORS.white,
                    ...FONTS.h3
                }}
                onPress={()=> {
                    filterModelSharedValue2.value = withTiming(SIZES.height, {
                        duration: 500
                    })

                    filterModelSharedValue1.value = withDelay(500, withTiming(SIZES.height, {
                        duration: 100
                    }))
                }}
                />
            </View>
        )
    }
  return (
    <Animated.View
        style={[{
            position: 'absolute',
            bottom: 0,
            height:SIZES.height,
            width: SIZES.width
        },filterModelContainerAnimatedStyle]}
    >
        <Animated.View
            style={[{
                flex:1,
                height: SIZES.height,
                width: SIZES.width,
                backgroundColor: COLORS.transparentBlack7
            },filterModelBgAnimatedStyle]}
        >

            <Animated.View
                style={[{
                    position:'absolute',
                    bottom: 0,
                    borderTopRightRadius: 30,
                    borderTopLeftRadius: 30,
                    backgroundColor: appTheme?.backgroundColor1,
                    height: SIZES.height * 0.9,
                    width: SIZES.width
                },filterModelContentAnimatedStyle]}
            >
                <View
                style={{
                    marginTop: SIZES.padding,
                    flexDirection: 'row',
                    paddingHorizontal: SIZES.padding
                }}
                >
                    <View
                        style={{
                            width: 60
                        }}
                    />

                    <Text
                        style={{
                            flex: 1,
                            textAlign: 'center',
                            color: appTheme?.textColor,
                            ...FONTS.h1
                        }}
                    >
                        Filter
                    </Text>

                    <TextButton
                        lable='Cancle'
                        contentContainerStyle={{
                            width: 60,
                            backgroundColor: null
                        }}
                        lableStyle={{
                            color: appTheme?.textColor,
                            ...FONTS.body3
                        }}
                        onPress={()=> {
                            filterModelSharedValue2.value = withTiming(SIZES.height, {
                                duration: 500
                            })

                            filterModelSharedValue1.value = withDelay(500, withTiming(SIZES.height, {
                                duration: 100
                            }))
                        }}
                    />
                </View>

                <ScrollView
                    contentContainerStyle={{
                        paddingHorizontal: SIZES.padding,
                        paddingBottom: 50
                    }}
                >
                    <View
                    style={{
                        marginTop: SIZES.radius
                    }}
                    >
                        <Text
                            style={{
                                color: appTheme?.textColor,
                                ...FONTS.h3
                            }}
                        >
                            Class Type
                        </Text>
                        <View
                        style={{
                            flexDirection: 'row',
                            marginTop: SIZES.radius
                        }}
                        >
                            {constants.class_types.map((item, index) => {
                                return (
                                    <ClassType
                                        key={`ClassType-${index}`}
                                        appTheme={appTheme}
                                        classType={item}
                                        isSelected = {selectedClassType == item?.id}
                                        containerStyle={{
                                            marginLeft: index == 0 ? 0 : SIZES.base
                                        }}
                                        onPress={()=> {
                                            setSelectedClassType(item?.id)
                                        }}
                                    />
                                )
                            })}
                        </View>
                    </View>
                    <View
                    style={{
                        marginTop: SIZES.padding
                    }}
                    >
                        <Text
                            style={{
                                color: appTheme?.textColor,
                                ...FONTS.h3
                            }}
                        >
                            Class Level
                        </Text>
                        <View>
                            {constants.class_levels.map((item, index) => {
                                return(
                                    <ClassLevel
                                    key={`ClassLevel-${index}`}
                                    appTheme={appTheme}
                                    classLevel={item}
                                    onPress={()=>{setSelectedClassLevel(item.id)}}
                                    isSelected={selectedClassLevel == item.id}
                                    isLastItem={index == constants.class_levels.length -1 }
                                    />
                                )
                            })}
                        </View>
                    </View>
                    <View
                    style={{
                        marginTop: SIZES.padding
                    }}
                    >
                        <Text
                            style={{
                                color: appTheme?.textColor,
                                ...FONTS.h3
                            }}
                        >
                            Created Within
                        </Text>
                        <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            flexWrap: 'wrap'
                        }}
                        >
                            {constants.created_within.map((item, index) => {
                                return(
                                    <TextButton
                                    key={`CreatedWithin-${index}`}
                                    lable={item.label}
                                    contentContainerStyle={{
                                        height: 45,
                                        width: 95,
                                        paddingHorizontal: SIZES.radius,
                                        marginLeft: index % 3 == 0 ? 0: SIZES.radius, 
                                        marginTop: SIZES.radius,
                                        borderWidth: 1,
                                        borderRadius: SIZES.radius,
                                        borderColor: item.id ==selectedCreatedWithin ? appTheme?.backgroundColor9 : appTheme?.lineDivider,
                                        backgroundColor: item?.id == selectedCreatedWithin ? appTheme?.backgroundColor9 : null
                                    }}
                                    lableStyle={{
                                        color: item.id == selectedCreatedWithin ? COLORS.white : appTheme?.textColor5,
                                        ...FONTS.body3
                                    }}
                                    onPress={()=>{setSelectedCreatedWithin(item.id)}}
                                    />
                                )
                            })}
                        </View>
                    </View>
                    <View
                    style={{
                        marginTop: SIZES.padding
                    }}
                    >
                        <Text
                            style={{
                                color:appTheme?.textColor,
                                ...FONTS.h3
                            }}
                        >
                            Class Length
                        </Text>
                        <View
                        style={{
                            alignItems: 'center'
                        }}
                        >
                           <TwoPointSlider
                           appTheme={appTheme}
                           textStyle={{color:appTheme?.textColor3}}
                           values={[20,50]}
                           min={15}
                           max={60}
                           postfix='min'
                           onValuesChange={(values)=> console.log(values)}
                           />
                        </View>
                    </View>
                </ScrollView>
                {renderFooter()}
            </Animated.View>
        </Animated.View>
    </Animated.View>
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
export default connect(mapStateToProps ,mapDispatchToProps )(FilterModel)

