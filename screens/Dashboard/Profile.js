
import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet
} from 'react-native';
import{SIZES, COLORS, FONTS, icons, images, dummyData} from '../../constants'
import { connect } from 'react-redux';
import { toggleTheme} from '../../stores/themeActions'
import { 
    IconButton,
    ProgressBar,
    TextButton,
    ProfileValue,
    ProfileRadioButton
} from '../../components'

const Profile = ({appTheme, toggleTheme}) => {
    const [newCourseNotification, setNewCourseNotification] = React.useState(false)
    const [studyReminder, setStudyReminder] = React.useState(false)

    function toggleThemeHandler(){
        if(appTheme?.name == 'light'){
            toggleTheme('dark')
        }else{
            toggleTheme('light')
        }
    }

    function renderHeader(){
        return(
            <View
                style={{
                    flexDirection:'row',
                    marginTop: 50,
                    paddingHorizontal: SIZES.padding,
                    justifyContent: 'space-between'
                }}
            >
                <Text style={{color: appTheme?.textColor,...FONTS.h1}}>Profile</Text>
                <IconButton
                    icon={icons.sun}
                    iconStyle={{
                        tintColor:appTheme?.tintColor
                    }}
                    onPress = {() => toggleThemeHandler()}
                />
            </View>
        )
    }
    function renderProfileCard(){
        return(
            <View
            style={{
                flexDirection: 'row',
                marginTop:SIZES.padding,
                paddingHorizontal: SIZES.radius,
                paddingVertical: 20,
                borderRadius: SIZES.radius,
                backgroundColor: appTheme?.backgroundColor2
            }}
            >
                <TouchableOpacity
                    style={{
                        width: 80,
                        height: 80
                    }}
                >
                    <Image
                        source={images.profile}
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 40,
                            borderWidth: 1,
                            borderColor: COLORS.white
                        }}
                    />
                    <View
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'flex-end'
                        }}
                    >
                        <View
                        style={{
                            width:30,
                            height: 30,
                            marginBottom: -15,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 15,
                            backgroundColor: COLORS.primary

                        }}
                        >
                            <Image
                            source={icons.camera}
                            resizeMode='contain'
                            style={{
                                width:17,
                                height: 17
                            }}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
                <View
                style={{
                    flex: 1,
                    marginLeft: SIZES.radius,
                    alignItems: 'flex-start'
                }}
                >
                    <Text style={{color: COLORS.white, ...FONTS.h2}}>Deepak Bairagi</Text>
                    <Text style={{color:COLORS.white, ...FONTS.body4}}>Full Stack Developer</Text>
                    <ProgressBar
                        progress='60%'
                        containerStyle={{
                            marginTop: SIZES.radius
                        }}
                    />

                    <View style={{flexDirection: 'row'}}>
                        <Text 
                            style={{
                                flex: 1,
                                color: COLORS.white,
                                ...FONTS.body4
                            }}
                        >
                            Overall Progress
                        </Text>
                        <Text 
                            style={{
                                color: COLORS.white,
                                ...FONTS.body4
                            }}
                        >
                            58%
                        </Text>
                    </View>

                    <TextButton
                        lable="+ Become Member"
                        contentContainerStyle={{
                            height: 35,
                            marginTop: SIZES.padding,
                            paddingHorizontal: SIZES.radius,
                            borderRadius: 20,
                            backgroundColor: appTheme?.backgroundColor4
                        }}
                        lableStyle={{
                            color: appTheme?.textColor2
                        }}
                    />
                </View>
            </View>
        )
    }
    function renderProfileSection1(){
        return(
            <View
            style={styles.profileSectionContainer}
            >
                <ProfileValue
                icon={icons.profile}
                lable= ' Name'
                value='Deepak Bairagi'
                />
                 <View
                 style={{
                    height:2 ,
                    width: '100%',
                    backgroundColor: COLORS.gray30
                 }}
                 />

                <ProfileValue
                icon={icons.email}
                lable= ' Email'
                value='deepakba846@gmail.com'
                />
                 <View
                 style={{
                    height:2 ,
                    width: '100%',
                    backgroundColor: COLORS.gray30
                 }}
                 />

                <ProfileValue
                icon={icons.password}
                lable= ' Password'
                value='Updated two weeks ago'
                />
                 <View
                 style={{
                    height:2 ,
                    width: '100%',
                    backgroundColor: COLORS.gray30
                 }}
                 />

                <ProfileValue
                icon={icons.call}
                lable= ' Contact Number'
                value='7247294834'
                />
                 
            </View>
        )
    }
    function renderProfileSection2(){
        return(
            <View
            style={styles.profileSectionContainer}
            >
                <ProfileValue
                icon={icons.star_1}
                value='Pages'
                />
                <View
                 style={{
                    height:2 ,
                    width: '100%',
                    backgroundColor: COLORS.gray30
                 }}
                 />

                <ProfileRadioButton
                icon={icons.new_icon}
                lable= 'New Course Notification'
                isSelected={newCourseNotification}
                onPress={()=>{
                    setNewCourseNotification(!newCourseNotification)
                }}
                />
                <View
                 style={{
                    height:2 ,
                    width: '100%',
                    backgroundColor: COLORS.gray30
                 }}
                 />

                <ProfileRadioButton
                icon={icons.reminder}
                lable= 'Study Reminder'
                isSelected={studyReminder}
                onPress={()=>{
                    setStudyReminder(!studyReminder)
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
            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding,
                    paddingBottom: 150
                }}
            >
                {renderProfileCard()}

                {renderProfileSection1()}
                {renderProfileSection2()}

            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    profileSectionContainer:{
        marginTop: SIZES.padding,
        paddingHorizontal: SIZES.padding,
        borderWidth: 1,
        borderRadius: SIZES.radius,
        borderColor: COLORS.gray20
    }
})
function mapStateToProps(state){
    return{
        appTheme: state.appTheme,
        error: state.error
    }
}
function mapDispatchToProps(dispatch){
    return{
        toggleTheme: (themeType) => {return dispatch(toggleTheme(themeType))}
    }
}
export default connect(mapStateToProps ,mapDispatchToProps )(Profile)