import React from 'react'
import {
    View,
    Text,
    Image,
    FlatList,
    StyleSheet,
    BackHandler
} from 'react-native'
import {SIZES, COLORS, FONTS, images, icons, dummyData} from '../../constants'
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
    runOnJS
} from 'react-native-reanimated'
import {
    IconButton,
    HorizontalCourseCard,
    FilterModel
} from '../../components'
import {connect} from 'react-redux'
import { SharedElement } from 'react-native-shared-element'

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList)

const HEADER_HEIGHT = 250;

const CourseListing = ({appTheme, navigation, route}) => {
    
    const {catagory, sharedElementPrefix} = route.params

    const flatlistRef = React.useRef()
    const scrollY = useSharedValue(0)
    const onScroll = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y
    })

    const headerSharedValue = useSharedValue(80)
    const filterModelSharedValue1 = useSharedValue(SIZES.height)
    const filterModelSharedValue2 = useSharedValue(SIZES.height)


    function renderHeader(){
       
        const inputRange = [ 0, HEADER_HEIGHT-50]
        headerSharedValue.value = withDelay(500,
            withTiming(0,{
                duration: 500
            })    
        )
        
        const headerFadeAnimatedStyle= useAnimatedStyle(()=> {
            return{
                opacity: interpolate(headerSharedValue.value, [80,0], [0,1])
            }
        })

        const headerTranslateAnimatedStyle= useAnimatedStyle(()=> {
            return{
                transform:[
                    {
                        translateY: headerSharedValue.value
                    }
                ] 
            }
        })

        const headerHeightAnimatedStyle = useAnimatedStyle(()=>{
            return {
                height: interpolate(scrollY.value, inputRange, [HEADER_HEIGHT, 120], Extrapolate.CLAMP)
            }
        })
        const headerHideOnScrollAnimatedStyle = useAnimatedStyle(()=>{
            return {
                opacity: interpolate(scrollY.value, [80,0], [0, 1], Extrapolate.CLAMP),
                transform:[
                    {
                        translateY: interpolate(scrollY.value, inputRange, [0,200], Extrapolate.CLAMP)
                    }
                ] 
            }
        })
        const headerShowOnScrollAnimatedStyle = useAnimatedStyle(()=>{
            return {
                opacity: interpolate(scrollY.value, [80,0], [ 1, 0], Extrapolate.CLAMP),
                transform:[
                    {
                        translateY: interpolate(scrollY.value, inputRange, [50, 130], Extrapolate.CLAMP)
                    }
                ] 
            }
        })
        return(
            <Animated.View
                style={[{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    left: 0,
                    height: 250,
                    overflow: 'hidden'
                },headerHeightAnimatedStyle]}
            >
                <SharedElement
                    id={`${sharedElementPrefix}-CatagoryCard-Bg-${catagory?.id}`}
                    style={StyleSheet.absoluteFillObject}
                >
                    <Image
                        source={catagory?.thumbnail}
                        resizeMode= 'cover'
                        style={{
                            height:'100%',
                            width: '100%',
                            borderBottomLeftRadius: 60
                        }}
                    />
                </SharedElement>
                <Animated.View
                    style={[{
                        position: 'absolute',
                        top: -80,
                        left: 0,
                        right: 0
                    },headerShowOnScrollAnimatedStyle]}
                >
                    
                    <Text
                        style={{
                            textAlign: 'center',
                            color: COLORS.white,
                            ...FONTS.h2
                        }}
                    >
                        {catagory.title}
                    </Text>
                
                </Animated.View>
                <Animated.View
                    style={[{
                        position: 'absolute',
                        left: 30,
                        bottom: 70
                    },headerHideOnScrollAnimatedStyle]}
                >
                    <SharedElement
                    id={`${sharedElementPrefix}-CatagoryCard-Title-${catagory?.id}`}
                    style={StyleSheet.absoluteFillObject}
                >
                    <Text
                        style={{
                            position: 'absolute',
                            color: COLORS.white,
                            ...FONTS.h1
                        }}
                    >
                        {catagory.title}
                    </Text>
                </SharedElement>
                </Animated.View>
                <Animated.View
                    style={headerFadeAnimatedStyle}
                >
                    <IconButton
                        icon={icons.back}
                        iconStyle={{
                            tintColor: appTheme?.tintColor
                        }}
                        containerStyle={{
                            position: 'absolute',
                            top: 40,
                            left: 20,
                            height: 50,
                            width: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 25,
                            backgroundColor: appTheme?.backgroundColor1
                        }}
                        onPress={() => {
                            if(scrollY.value >= 0 && scrollY.value <= 200){
                                flatlistRef.current?.scrollToOffset({
                                    offset:0,
                                    animated: true
                                })

                                setTimeout(()=> {
                                    
                                    headerSharedValue.value = 
                                    withTiming(80, {
                                        duration: 500
                                    }, ()=> {
                                        runOnJS(navigation.goBack)()
                                    })
                                },100)
                            }else{
                                navigation.goBack()
                            }
                        }}
                    />
                </Animated.View>
                <Animated.Image 
                    source={images.mobile_image}
                    resizeMode= 'contain'
                    style={[{
                        position: 'absolute',
                        bottom: -40,
                        right: 40,
                        height: 200,
                        width: 100
                    },headerFadeAnimatedStyle, headerTranslateAnimatedStyle,headerHideOnScrollAnimatedStyle]}
                />
            </Animated.View>
        )
    }
    function renderResults(){
        return(
            <AnimatedFlatlist
                ref={flatlistRef}
                data= {dummyData.courses_list_2}
                keyExtractor={item => `Results-${item.id}`}
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding
                }}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                keyboardDismissMode='on-drag'
                onScroll={onScroll}
                ListHeaderComponent={
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems:'center',
                            marginTop: 270,
                            marginBottom: SIZES.base
                        }}
                    >
                        <Text
                        style={{
                            flex: 1,
                            color: appTheme?.textColor,
                            ...FONTS.body3
                        }}
                        >
                            5,761 Results
                        </Text>
                        <IconButton
                            icon={icons.filter}
                            iconStyle={{
                                height: 20,
                                width: 20,
                                tintColor: appTheme?.backgroundColor1
                            }}
                            containerStyle={{
                                height: 40,
                                width: 40,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 10,
                                backgroundColor: COLORS.primary
                            }}
                            onPress={()=>{
                                filterModelSharedValue1.value = 
                                withTiming(0, {
                                    duration: 100
                                })

                                filterModelSharedValue2.value = 
                                withDelay(100,
                                    withTiming(0,{
                                        duration:500
                                    })
                                )
                            }}
                        />
                    </View>
                }
                renderItem={({item, index})=>(
                    <HorizontalCourseCard
                        course={item}
                        containerStyle={{
                            marginVertical: SIZES.padding,
                            marginTop: index == 0 ? SIZES.radius : SIZES.padding
                        }}
                        onPress={() => navigation.navigate('CourseDetails',{selectedCourse: item})}
                    />
                )}
                ItemSeparatorComponent={() => 
                    <View 
                        style={{
                            height: 2,
                            width: '100%',
                            backgroundColor: appTheme?.lineDivider
                        }}
                    />
                }
            />
        )
    }
  return (
    <View
        style={{
            flex: 1,
            backgroundColor: appTheme?.backgroundColor1
        }}
    >
        {renderResults()}
        {renderHeader()}
        <FilterModel
            filterModelSharedValue1={filterModelSharedValue1}
            filterModelSharedValue2={filterModelSharedValue2}
        />
    </View>
  )
}

CourseListing.saredElements= (route, otherRoute, showing) => {
    if(otherRoute.name == 'Dashboard'){
        const {catagory, sharedElementPrefix} = route.params;
         return[
             {
                 id: `${sharedElementPrefix}-CourseCard-Bg-${catagory?.id}`
             },
             {
                 id: `${sharedElementPrefix}-CourseCard-Title-${catagory?.id}`
     
             }
         ]
    }
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
export default connect(mapStateToProps ,mapDispatchToProps )(CourseListing)
