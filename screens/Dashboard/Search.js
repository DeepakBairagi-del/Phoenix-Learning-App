import React from 'react';
import {
    View,
    Text,
    Image,
    TextInput
} from 'react-native';
import {Shadow} from 'react-native-shadow-2'
import {FlatList} from 'react-native-gesture-handler'
import {CatagoryCard, TextButton} from '../../components'
import { COLORS, SIZES, FONTS, icons, dummyData } from '../../constants';
import Animated,{
    Extrapolate,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue
} from 'react-native-reanimated'
import {connect} from 'react-redux'
import { useNavigation } from '@react-navigation/native';

const Search = ({appTheme}) => {
    const navigation = useNavigation()
    const [searchText, setSearchText] = React.useState('')
    const scrollViewRef = React.useRef()

    const scrollY = useSharedValue(0)
    const onScroll = useAnimatedScrollHandler((event)=> {
        scrollY.value = event.contentOffset.y
    })
    function renderTopSearches(){
        return(
            <View
            style={{
                marginTop: SIZES.padding
            }}
            >
                <Text
                    style={{
                        color: appTheme?.textColor,
                        marginHorizontal: SIZES.padding,
                        ...FONTS.h2
                    }}
                >
                    Top Searches
                </Text>
                <FlatList
                    horizontal
                    data={dummyData.top_searches}
                    listKey="TopSearches"
                    keyExtractor={item => `TopSearches-${item.id}`}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        marginTop:SIZES.radius
                    }}
                    renderItem={({item, index})=>(
                        <TextButton
                            lable={item.label}
                            contentContainerStyle={{
                                paddingVertical: SIZES.radius,
                                paddingHorizontal: SIZES.padding,
                                marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
                                marginRight: index == dummyData.top_searches.length - 1 ? SIZES.padding : 0,
                                borderRadius: SIZES.radius,
                                backgroundColor: appTheme?.backgroundColor8
                            }}
                            lableStyle={{
                                color: COLORS.gray50,
                                ...FONTS.h3
                            }}
                            onPress={()=> setSearchText(item.label)}
                        />
                    )}
                />
            </View>
        )
    }
    function renderBrowseCatagories(){
        return(
            <View
                style={{
                    marginTop: SIZES.padding
                }}
            >
                <Text style={{marginHorizontal:SIZES.padding,color: appTheme?.textColor, ...FONTS.h2}}> Browse Catagories</Text>
                <FlatList
                    data={dummyData.categories}
                    numColumns={2}
                    scrollEnabled={false}
                    listKey= "BrowseCatagories"
                    keyExtractor={item => `BrowseCatagories-${item.id}`}
                    contentContainerStyle={{
                        marginTop: SIZES.radius
                    }}
                    renderItem={({item, index}) => (
                        <CatagoryCard
                            sharedElementPrefix="Search"
                            catagory={item}
                            containerStyle={{
                                height: 130,
                                width: (SIZES.width - (SIZES.padding*2) - SIZES.radius)/2,
                                marginTop: SIZES.radius,
                                marginLeft: (index + 1) % 2 == 0 ? SIZES.radius : SIZES.padding,
                            }}
                            onPress={()=> navigation.navigate('CourseListing',{ catagory: item, sharedElementPrefix: "Search"})}
                        />
                    )}
                />
            </View>
        )
    }
    function renderSearchBar(){
        const inputRange= [0,55]
        const searchBarAnimatedStyle = useAnimatedStyle(()=> {
            return{
                height: interpolate(scrollY.value, inputRange, [55,0], Extrapolate.CLAMP),
                opacity: interpolate(scrollY.value, inputRange, [1,0], Extrapolate.CLAMP)

            }
        })
        return(
            <Animated.View
                style={[{
                    position: 'absolute',
                    top:50,
                    left:0,
                    right: 0,
                    paddingHorizontal: SIZES.padding,
                    height:50
                },searchBarAnimatedStyle]}
            >
                <Shadow>
                    <View
                        style={{
                            flex:1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: SIZES.width - (SIZES.padding * 2 ),
                            paddingHorizontal: SIZES.radius,
                            borderRadius: SIZES.radius,
                            backgroundColor: appTheme?.backgroundColor7
                        }}
                    >
                        <Image
                        source={icons.search}
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: COLORS.gray40
                        }}
                        />
                        <TextInput
                            style={{
                                flex:1,
                                marginLeft: SIZES.base,
                                ...FONTS.h4
                            }}
                            value={searchText}
                            onChange={(e)=> setSearchText(e.target.value)}
                            placeholder='Search for Topics, Courses & Educators'
                            placeholderTextColor={appTheme?.textColor6}
                        />
                    </View>
                </Shadow>
            </Animated.View>
        )
    }
    return (
        <View
            style={{
                flex:1,
                backgroundColor: appTheme?.backgroundColor1
            }}
        >
            <Animated.ScrollView
            ref={scrollViewRef}
            contentContainerStyle={{
                marginTop:100,
                paddingBottom:300
            }}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            keyboardDismissMode="on-drag"
            onScroll={onScroll}
            onScrollEndDrag={(event)=>{
                if(event.nativeEvent.contentOffset.y >10 && event.nativeEvent.contentOffset.y < 50){
                    scrollViewRef.current?.scrollTo({
                        x: 0,
                        y: 0,
                        animated: true
                    })
                }
            }}
            >
                {renderTopSearches()}
                {renderBrowseCatagories()}
            </Animated.ScrollView>
            {renderSearchBar()}
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
export default connect(mapStateToProps ,mapDispatchToProps )(Search)
