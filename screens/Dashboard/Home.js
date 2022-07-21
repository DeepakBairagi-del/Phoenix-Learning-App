import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    ScrollView
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import {
    CatagoryCard,
    IconButton, 
    TextButton, 
    VerticalCourseCard,
    HorizontalCourseCard
} from '../../components'
import {
    COLORS,
    FONTS,
    SIZES,
    icons,
    images,
    dummyData
}from '../../constants'
import { connect } from 'react-redux'
import appTheme from '../../constants/theme';
import { useNavigation } from '@react-navigation/native';

const Section = ({appTheme,containerStyle, onPress, children, title}) => {
    return(
        <View
        style={{
            ...containerStyle
        }}
        >
            <View
            style={{
                flexDirection: 'row',
                paddingHorizontal: SIZES.padding
            }}
            >
                <Text
                    style={{
                        flex:1,
                        color: appTheme?.textColor,
                        ...FONTS.h3
                    }}
                >
                    {title}
                </Text>

                <TextButton
                    contentContainerStyle={{
                        width: 80,
                        borderRadius: 30,
                        backgroundColor: COLORS.primary
                    }}
                    lable= "See All"
                    onPress={onPress}
                />
            </View>
            {children}
        </View>
    )
}
const Home = ({ appTheme}) => {
    const navigation = useNavigation()
    function renderHeader (){
        return(
            <View
            style={{
                flexDirection: 'row',
                marginTop: 40,
                marginBottom: 10,
                paddingHorizontal: SIZES.padding,
                alignItems: 'center'
            }}
            >
                <View style={{flex:1}}>
                    <Text style={{color:appTheme?.textColor, ...FONTS.h2}}>Hello, Students!</Text>
                    <Text style={{color: COLORS.gray50, ...FONTS.body3}}>Thurseday, 9th Sept 2022</Text>
                </View>

                <IconButton
                icon={icons.notification}
                iconStyle={{
                    tintColor: appTheme?.tintColor
                }}
                />
            </View>
        )
    }
    function renderStartLearning(){
        return(
            <ImageBackground
            source={images.featured_bg_image}
            style={{
                alignItems: 'flex-start',
                padding: 15,
                marginTop: SIZES.padding,
                marginHorizontal: SIZES.padding
            }}
            imageStyle={{
                borderRadius: SIZES.radius
            }}
            >
                <View>
                    <Text
                        style={{
                            color: COLORS.white,
                            ...FONTS.body2
                        }}
                    >
                        HOW TO
                    </Text>
                    <Text
                        style={{
                            color: COLORS.white,
                            ...FONTS.h2
                        }}
                    >
                        Make your brand more visible with our 
                        checklist
                    </Text>
                    <Text
                        style={{
                            marginTop: SIZES.radius,
                            color: COLORS.white,
                            ...FONTS.body4
                        }}
                    >
                        By Deepak Bairagi 
                    </Text>
                </View>

                <Image
                source={images.start_learning}
                style={{
                    width:'100%',
                    height:110,
                    marginTop: SIZES.padding
                }}
                />

                <TextButton
                lable='Start Learning'
                contentContainerStyle={{
                    height: 40,
                    paddingHorizontal: SIZES.padding,
                    borderRadius: 20,
                    backgroundColor: COLORS.white
                }}
                lableStyle={{
                    color: COLORS.black
                }}
                />
            </ImageBackground>
        )
    }
    function renderCourses(){
        return(
            <FlatList
                horizontal
                data={dummyData.courses_list_1}
                listKey= 'Courses'
                keyExtractor= {item => `Courses-${item.id}`}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop:SIZES.padding
                }}
                renderItem={({item, index}) => (
                    <VerticalCourseCard
                    containerStyle={{
                        marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
                        marginRight: index == dummyData.courses_list_1.length -1 ? SIZES.padding : 0 
                    }}
                    course={item}
                    onPress={() => navigation.navigate('CourseDetails',{selectedCourse: item})}
                    />
                )}
            />
        )
    }

    function renderCatagories(){
        return(
            <Section
            title="Catagories"
            appTheme={appTheme}
            >
                <FlatList
                    horizontal
                    data={dummyData.categories}
                    listKey= "Catagories"
                    keyExtractor={item => `Catagories-${item.id}`}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        marginTop: SIZES.radius
                    }}
                    renderItem={({item, index}) => (
                        <CatagoryCard
                            sharedElementPrefix='Home'
                            catagory={item}
                            containerStyle={{
                                marginLeft:index == 0 ? SIZES.padding : SIZES.base,
                                marginRight: index == dummyData.categories.length -1 ? SIZES.padding : 0
                            }}
                            onPress={()=> navigation.navigate('CourseListing',{catagory: item, sharedElementPrefix: 'Home'})}
                        />
                    )}
                />
            </Section>
        )
    }
    function renderPopularCourses(){
        return(
            <Section
            title="Popolar Courses"
            appTheme={appTheme}
            containerStyle={{
                marginTop: 30
            }}
            >
                <FlatList
                data={dummyData.courses_list_2}
                listKey="PopularCourses"
                scrollEnabled={false}
                keyExtractor={item => `PopularCourses-${item.id}`}
                contentContainerStyle={{
                    marginTop: SIZES.radius,
                    paddingHorizontal: SIZES.padding
                }}
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
                ItemSeparatorComponent={()=>(
                    <View
                    style={{
                        height:2,
                        width:'100%',
                        backgroundColor:appTheme?.lineDivider
                    }}
                    />
                )}
                />
            </Section>
        )
    }
    return (
        <View
        style={{
            flex:1,
            backgroundColor:appTheme?.backgroundColor1
        }}
        >
            {renderHeader()}
            
            <ScrollView
            contentContainerStyle={{
                paddingBottom: 150,    
            }}
            showsHorizontalScrollIndicator={false}
            >
                {renderStartLearning()}
                {renderCourses()}
                <View 
                style={{
                    height:2,
                    width: '100%',
                    backgroundColor: appTheme?.lineDivider,
                    marginVertical: SIZES.padding
                }}
                />

                {renderCatagories()}
                {renderPopularCourses()}
            </ScrollView>
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
export default connect(mapStateToProps ,mapDispatchToProps )(Home)
