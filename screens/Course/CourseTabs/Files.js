import React from 'react'
import {
    View,
    Text,
    Image,
    ScrollView
} from 'react-native'
import {
  COLORS,
  SIZES,
  FONTS,
  icons,
  dummyData
} from '../../../constants'
import { IconButton, TextButton} from '../../../components'

const Files = ({appTheme}) => {
  function renderStudents() {
    let students = []
    if (dummyData?.course_details?.students.length > 3){
      students = dummyData?.course_details?.students.slice(0, 3)
    }else {
      students = dummyData?.course_details?.students
    }
    return (
      <View>
        <Text 
          style={{
            color: appTheme?.textColor,
            ...FONTS.h2,
            fontSize: 25
          }}
        >
          Students
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.radius,
            alignItems: 'center'
          }}
        >
          {students.map((item,index) => {
            return (
              <Image
                source={item.thumbnail}
                key={`Students-${index}`}
                style={{
                  marginLeft: index == 0? 0 : SIZES.radius,
                  height: 80,
                  width: 80
                }}
              />
            )
          })}
          {dummyData?.course_details?.students.length > 3 && 
            <TextButton
              lable='View All'
              lableStyle={{
                color: COLORS.primary,
                ...FONTS.h3
              }}
              contentContainerStyle={{
                marginLeft: SIZES.base,
                width: 50,
                backgroundColor: null
              }}
            />
          }
        </View>
      </View>
    )
  }
  function renderFiles() {
    return (
      <View
      style={{
        marginTop: SIZES.padding
      }}
      >
        <Text 
          style={{
            color: appTheme?.textColor,
            ...FONTS.h2,
            fontSize: 25
          }}
        >
          Files
        </Text>

        {dummyData?.course_details?.files.map((item, index) => {
          return (
            <View
              key={`Files-${index}`}
              style={{
                marginTop: SIZES.radius,
                flexDirection: 'row',
                marginBottom: index == dummyData?.course_details?.files.length - 1 ? 30 : 0
              }}
            >
              <Image
                source={item?.thumbnail}
                style={{
                  height: 80,
                  width: 80
                }}
              />

              <View
              style={{
                flex: 1,
                marginLeft: SIZES.radius
              }}
              >
                <Text style={{...FONTS.h2, color:appTheme?.textColor}}>{item.name}</Text>
                <Text style={{...FONTS.body3, color: COLORS.gray30}}>{item.author} </Text>
                <Text style={{...FONTS.body4, color:appTheme?.textColor}}>{item.upload_date}</Text>
              </View>
              <IconButton
                icon={icons.menu}
                iconStyle={{
                  width: 25,
                  height: 25,
                  tintColor: appTheme?.textColor
                }}
                containerStyle={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 25
                }}
              />
            </View>
          )
        })}
      </View>
    )
  }
  return (
    <ScrollView
      style={{
        padding: SIZES.padding
      }}
    >
      {renderStudents()}
      {renderFiles()}
    </ScrollView>
  )
}

export default Files