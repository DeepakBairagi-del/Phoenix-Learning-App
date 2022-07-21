import React from 'react'
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Animated,
    Keyboard
} from 'react-native'
import {
    COLORS,
    SIZES,
    FONTS,
    icons,
    constants,
    dummyData
} from '../../constants'
import {IconButton} from '../../components'
import {Video} from 'expo-av'
import {
    Files,
    Chapters,
    Discussions
} from '../../screens'
import {connect} from 'react-redux'

const course_details_tabs = constants.course_details_tabs.map((course_details_tab)=> ({
    ...course_details_tab,
    ref: React.createRef()
}))

const TabIndicator = ({measureLayout, scrollX}) => {
    const inputRange = course_details_tabs.map((_, i) => i* SIZES.width)
    const tabIndicatorWidth= scrollX.interpolate({
        inputRange,
        outputRange: measureLayout.map(measure => measure.width)
    })
    const translateX= scrollX.interpolate({
        inputRange,
        outputRange: measureLayout.map(measure => measure.x)
    })
    return (
        <Animated.View
            style={{
                position: 'absolute',
                bottom: 0,
                height: 4,
                width: tabIndicatorWidth,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.primary,
                transform: [{
                    translateX
                }]
            }}
        />
    )
}
const Tabs = ({appTheme, scrollX, onTabPress}) => {
    const containerRef = React.useRef();
    const [measureLayout, setMeasureLayout] = React.useState([])

    React.useEffect(()=> {
        let ml = []

        course_details_tabs.forEach(bottom_tab => {
            bottom_tab?.ref?.current?.measureLayout(
                containerRef.current,
                (x, y, width, height) => {
                    ml.push({
                        x, y, width, height
                    })

                    if(ml.length === course_details_tabs.length){
                        setMeasureLayout(ml)
                    }
                }
            )
        })
    },[containerRef.current])
    return(
        <View
            ref={containerRef}
            style={{
                flex:1,
                flexDirection: 'row'
            }}
        >
            {measureLayout.length > 0 && <TabIndicator measureLayout= {measureLayout} scrollX={scrollX}/>}
            {course_details_tabs.map((item,index) => {
                return (
                    <TouchableOpacity
                        key={`Tab-${index}`}
                        ref={item.ref}
                        style={{
                            flex:1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingHorizontal: 15
                        }}
                        onPress={()=>{
                            Keyboard.dismiss()
                            onTabPress(index)
                        }}
                    >
                        <Text style={{color: appTheme?.textColor, fontSize: SIZES.height > 800 ? 18 : 17, ...FONTS.h3}}>{item.label}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

const CourseDetails = ({appTheme, navigation, route}) => {
    const onTabPress = React.useCallback(tabIndex => {
        flatlistRef?.current?.scrollToOffset({
            offset: tabIndex * SIZES.width
        })
    })

    const {selectedCourse} = route.params;
    const [playVideo, setPlayVideo] = React.useState(false)
    const [isFavourite, setIsFavourite] = React.useState(selectedCourse?.is_favourite)

    const flatlistRef = React.useRef()
    const scrollX = React.useRef(new Animated.Value(0)).current

    function renderVideoSection(){
        return(
            <View
            style={{
                height: SIZES.height > 800 ? 220 : 200,
                alignItems:'center',
                justifyContent: 'center',
                backgroundColor: COLORS.gray90
            }}
            >
                <ImageBackground
                source={selectedCourse?.thumbnail}
                style={{
                    height: '100%',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                >
                    <IconButton
                    icon={icons.play}
                    iconStyle={{
                        width: 25,
                        height: 25,
                        tintColor: COLORS.white
                    }}
                    containerStyle={{
                        width: 55,
                        height: 55,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: SIZES.padding,
                        borderRadius: 30,
                        backgroundColor: COLORS.primary
                    }}
                    onPress={()=> setPlayVideo(true)}
                    />
                </ImageBackground>
                {playVideo && 
                    <Video
                        source={{uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'}}
                        rate={1.0}
                        volume={1.0}
                        isMuted={false}
                        useNativeControls
                        resizeMode='cover'
                        shouldPlay
                        isLooping
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            left: 0,
                            bottom: 0,
                            backgroundColor: COLORS.black
                        }}
                    />
                }
            </View>
        )
    }
    function renderHeaderComponents(){
        return(
            <>
                <View style={{flex: 1}}>
                    <IconButton
                    icon={icons.back}
                    iconStyle={{
                        width: 25,
                        height: 25,
                        tintColor: appTheme?.tintColor
                    }}
                    containerStyle={{
                        width: 40,
                        height:40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 20,
                        backgroundColor: appTheme?.backgroundColor1
                    }}
                    onPress={()=> navigation.goBack()}
                    />
                </View>
                <View style={{flexDirection: 'row'}}>
                    <IconButton
                    icon={icons.media}
                    iconStyle={{
                        tintColor: COLORS.white
                    }}
                    containerStyle={{
                        width: 50,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    />
                    <IconButton
                    icon={isFavourite ? icons.favourite : icons.favourite_outline}
                    iconStyle={{
                        tintColor: isFavourite? COLORS.secondary : COLORS.white
                    }}
                    containerStyle={{
                        width: 50,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => setIsFavourite(!isFavourite)}
                    />
                </View>
            </>
        )
    }
    function renderHeader() {
        if(playVideo){
            return(
                <View
                style={{
                    flexDirection: 'row',
                    paddingHorizontal: SIZES.radius,
                    paddingBottom: SIZES.base,
                    height: 85,
                    backgroundColor: COLORS.black,
                    alignItems: 'flex-end'
                }}
                >
                    {renderHeaderComponents()}
                </View>
            )
        }else {
            return(
                <View
                style={{
                    position: 'absolute',
                    top: SIZES.height > 800 ? 40 : 20,
                    left: 0,
                    right: 0,
                    flexDirection: 'row',
                    paddingHorizontal: SIZES.padding,
                    zIndex: 1
                }}
                >
                    {renderHeaderComponents()}
                </View>
            )
        }
    }
    function renderContent() {
        return(
            <View style={{flex:1}}>

                <View
                style={{
                    height: 60,
                }}
                >
                    <Tabs
                    appTheme={appTheme}
                    scrollX={scrollX}
                    onTabPress={onTabPress}
                    />
                </View>
                <View
                style={{
                    height: 2,
                    width: '100%',
                    backgroundColor:appTheme?.lineDivider
                }}
                />
                <Animated.FlatList
                    ref={flatlistRef}
                    horizontal
                    pagingEnabled
                    scrollEnabled={false}
                    snapToAlignment='center'
                    snapToInterval={SIZES.width}
                    decelerationRate='fast'
                    keyboardDismissMode='on-drag'
                    showsHorizontalScrollIndicator={false}
                    data={constants.course_details_tabs}
                    keyExtractor={item => `CourseDetailsTabs-${item.id}}`}
                    onScroll={
                        Animated.event([
                            {nativeEvent: {contentOffset: {x: scrollX }}}
                        ],{
                            useNativeDriver: false
                        })
                    }
                    renderItem={({item, index})=>{
                        return (
                            <View
                            style={{width: SIZES.width}}
                            >
                                {item.label == 'Chapters' && <Chapters appTheme={appTheme}/>}
                                {item.label == 'Files' && <Files appTheme={appTheme}/>}
                                {item.label == 'Discussions' && <Discussions appTheme={appTheme}/>}
                            </View>
                        )
                    }}
                />
            </View>
        )
    }
  return (
    <View
    style={{
        flex: 1,
        backgroundColor: appTheme?.backgroundColor1
    }}
    >   
        {renderHeader()}
        {renderVideoSection()}
        {renderContent()}
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
export default connect(mapStateToProps ,mapDispatchToProps )(CourseDetails)
