import React from 'react'
import { 
    View,
    Text,
    Image,
    FlatList,
    ScrollView
} from 'react-native'
import {SIZES, COLORS, FONTS, images, icons, dummyData} from '../../../constants'
import {
  IconLable,
  TextButton,
  HorizontalCourseCard
} from '../../../components'
import { useNavigation } from '@react-navigation/native'
import appTheme from '../../../constants/theme'

const Chapters = ({appTheme}) => {
  const navigation = useNavigation()
  const [isFollowing, setIsFollowing] = React.useState(false)
  function renderHeader(){
    return(
      <View
      style={{
        marginTop: SIZES.padding,
        paddingHorizontal: SIZES.padding
      }}
      >
        <Text
        style={{
          color: appTheme?.textColor,
          ...FONTS.h2
        }}
        >
          {dummyData?.course_details?.title}
        </Text>

        <View
        style={{
          flexDirection: 'row',
          marginTop: SIZES.base
        }}
        >
          <Text
          style={{
            color: COLORS.gray30,
            ...FONTS.body4
          }}
          >
            {dummyData?.course_details?.number_of_students}
          </Text>
          <IconLable
                    icon={icons.time}
                    lable={dummyData?.course_details?.duration}
                    containerStyle={{
                        marginLeft: SIZES.radius
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
          marginTop: SIZES.radius,
          alignItems: 'center'
        }}
        >
          <Image
            source={images.profile}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25
            }}
          />

          <View
            style={{
              flex: 1,
              marginLeft: SIZES.base,
              justifyContent: 'center'
            }}
          >
            <Text style={{...FONTS.h3, fontSize: 18, color:appTheme?.textColor}}>
              {dummyData?.course_details?.instructor?.name}
            </Text>
            <Text style={{color: appTheme?.textColor7, ...FONTS.body3}}>
              {dummyData?.course_details?.instructor?.title}
            </Text>
          </View>

          <TextButton
            lable={isFollowing? 'Following' : 'Follow +'}
            contentContainerStyle={{
              width: 80,
              height: 35,
              borderRadius: 20,
              backgroundColor: isFollowing? appTheme?.tintColor2 : COLORS.primary
            }}
            lableStyle={{
              color:isFollowing? appTheme?.backgroundColor1: COLORS.white,
              ...FONTS.h3
            }}
            onPress={()=> setIsFollowing(!isFollowing)}
          />
        </View>
      </View>
    )
  }
  
  function renderPopularCourses(){
    return(
      <View style={{marginTop: SIZES.padding}}>
        <View style={{
            flexDirection: 'row',
            paddingHorizontal: SIZES.padding
          }}
        >
          <Text style={{flex: 1,color:appTheme?.textColor, ...FONTS.h2}}>
            Popular Courses
          </Text>
          <TextButton
            lable='See All'
            contentContainerStyle={{
              width: 80,
              borderRadius: 30,
              backgroundColor: COLORS.primary
            }}
          />
        </View>
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
      </View>
    )
  }

  function renderChapters(){
    return(
      <View>
        {dummyData?.course_details?.videos.map((item, index)=>{
          return (
            <View
              key={`Videos-${index}`}
              style={{
                alignItems: 'center',
                height: 70,
                backgroundColor: item?.is_playing ? appTheme?.backgroundColor3 : null
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: SIZES.padding,
                  alignItems: 'center',
                  height: 70
                }}
              >
                <Image
                  source={item?.is_complete? icons.completed : item?.is_playing? icons.play_1 : icons.lock }
                  style={{
                    width: 40,
                    height: 40,
                  }}
                />

                <View
                  style={{
                    flex: 1,
                    marginLeft: SIZES.radius,
                  }}
                >
                  <Text style={{color: appTheme?.textColor, ...FONTS.h3}}>
                    {item.title}
                  </Text>
                  <Text style={{...FONTS.body4, color: COLORS.gray30}}>
                    {item.duration}
                  </Text>
                </View>

                <View
                style={{
                  flexDirection: 'row'
                }}
                >
                  <Text
                    style={{
                      color: COLORS.gray30,
                      ...FONTS.body4
                    }}
                  >
                    {item.size}
                  </Text>
                  <Image
                    source={item?.is_downloaded ? icons.completed : icons.download}
                    style={{
                      marginLeft: SIZES.base,
                      width: 25,
                      height:25,
                      tintColor: item?.is_lock ? COLORS.additionalColor4 : null
                    }}
                  />
                </View>
              </View>
               {item?.is_playing && 
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    height: 5,
                    width: item.progress,
                    backgroundColor: COLORS.primary
                  }}
                >

                </View>
               }
            </View>
          )
        })}
      </View>
    )
  }
  return (
    <ScrollView>
      {renderHeader()}
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: appTheme?.lineDivider,
          marginVertical: SIZES.radius
        }}
      />
      {renderChapters()}
      {renderPopularCourses()}
    </ScrollView>
  )
}

export default Chapters