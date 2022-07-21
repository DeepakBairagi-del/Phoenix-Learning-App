import { View, Text, TextInput, Keyboard, FlatList, Image } from 'react-native'
import React from 'react'
import {IconButton, IconLableButton} from '../../../components'
import {COLORS, SIZES, FONTS, icons, dummyData} from '../../../constants'

const CommentSection = ({appTheme,commentItem, commentOption, replies}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: SIZES.padding
      }}
    >
      <Image
        source={commentItem?.profile}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20
        }}
      />

      <View
        style={{
          flex: 1,
          marginTop: 3,
          marginLeft: SIZES.radius
        }}
      >
        <Text style={{...FONTS.h3,color: appTheme?.textColor}}>{commentItem?.name}</Text>
        <Text style={{...FONTS.body4,color: appTheme?.textColor7}}>{commentItem?.comment}</Text>

        {commentOption}

        {replies}
      </View>
      
    </View>
  )
}
const Discussions = ({appTheme}) => {

  const [footerPosition, setFooterPosition] = React.useState(0)
  const [footerHeight, setFooterHeight] = React.useState(60)


  React.useEffect(()=>{
    const showSubscription = Keyboard.addListener('keyboardWillShow', (e) => {
      setFooterPosition (e.endCoordinates.height)
    })
    const hideSubscription = Keyboard.addListener('keyboardWillHide', (e) => {
      setFooterPosition (0)
    })

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    }
  },[])

  function renderDiscussions(){
    return(
      <View
        style={{
          flex: 1,
          marginBottom: 60
        }}
      >
        <FlatList
          data={dummyData?.course_details?.discussions}
          keyExtractor={item=>`Discussions-main-${item.id}`}
          style={{
            paddingHorizontal: SIZES.padding,
            paddingBottom: 70
          }}
          renderItem={({item, index})=> {
            return (
              <CommentSection
                appTheme={appTheme}
                commentItem={item}
                commentOption={
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: SIZES.radius,
                      paddingHorizontal: SIZES.base,
                      borderTopWidth: 1,
                      borderBottomWidth: 1,
                      borderColor: COLORS.gray20
                    }}
                  >
                    
                    <IconLableButton
                      icon={icons.comment}
                      lable={item?.no_of_comments}
                      iconStyle={{
                        tintColor: appTheme?.textColor5
                      }}
                      lableStyle={{
                        marginLeft: 3,
                        color: appTheme?.textColor5,
                        ...FONTS.h4
                      }}
                    />

                    <IconLableButton
                      icon={icons.heart}
                      lable={item?.no_of_likes}
                      containerStyle={{
                        marginLeft: SIZES.radius
                      }}
                      lableStyle={{
                        marginLeft: 3,
                        color: appTheme?.textColor5,
                        ...FONTS.h4
                      }}
                    />

                    <Text
                      style={{
                        flex: 1,
                        color: appTheme?.textColor5,
                        textAlign: 'right',
                        ...FONTS.h4
                      }}
                    >
                      {item?.posted_on}
                    </Text>
                  </View>
                }
                replies ={
                  <FlatList
                    data={item?.replies}
                    scrollEnabled= {false}
                    keyExtractor={item => `Discussion-replies-${item.id}`}
                    renderItem={({item, index}) => {
                      return (
                        <CommentSection
                          appTheme={appTheme}
                          commentItem={item}
                          commentOption={
                            <View
                              style={{
                                flexDirection: 'row',
                                marginTop: SIZES.radius,
                                paddingHorizontal: SIZES.base,
                                borderTopWidth: 1,
                                borderBottomWidth: 1,
                                borderColor: COLORS.gray20
                              }}
                            >
                              
                              <IconLableButton
                                icon={icons.reply}
                                lable='Reply'
                                iconStyle={{
                                  tintColor: appTheme?.textColor5
                                }}
                                lableStyle={{
                                  marginLeft: 5,
                                  color: appTheme?.textColor5,
                                  ...FONTS.h4
                                }}
                              />
          
                              <IconLableButton
                                icon={icons.heart_off}
                                lable='Like'
                                containerStyle={{
                                  marginLeft: SIZES.radius
                                }}
                                lableStyle={{
                                  marginLeft: 3,
                                  color: appTheme?.textColor5,
                                  ...FONTS.h4
                                }}
                                iconStyle={{
                                  tintColor: appTheme?.textColor5
                                }}
                              />
          
                              <Text
                                style={{
                                  flex: 1,
                                  color: appTheme?.textColor5,
                                  textAlign: 'right',
                                  ...FONTS.h4
                                }}
                              >
                                {item?.posted_on}
                              </Text>
                            </View>
                          }
                          
                        />
                      )
                    }}
                  />
                }
              />
            )
          }}
        />
      </View>
    )
  }

  function renderFooter(){
    return(
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          bottom: footerPosition,
          left: 0,
          right: 0,
          height: footerHeight,
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.radius,
          backgroundColor: appTheme?.backgroundColor8
        }}
      >
        <TextInput
          style={{
            flex: 1,
            marginRight: SIZES.base,
            color:appTheme?.textColor,
            ...FONTS.body3
          }}
          multiline 
          placeholder='Type Something'
          placeholderTextColor={appTheme?.textColor3}
          onContentSizeChange={(event) => { 
            const height = event. nativeEvent.contentSize.height;
            if( height <= 60){
              setFooterHeight(60)
            }else if (height > 60 && height <= 100){
              setFooterHeight(height)
            }else if(height > 100){
              setFooterHeight(100)
            }
          }}
        />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <IconButton
            icon={icons.send}
            iconStyle={{
              height: 25,
              width: 25,
              tintColor: COLORS.primary
            }}
          />
        </View>
      </View>
    )
  }
  return (
    <View
      style={{
        flex: 1
      }}
    >
      {renderDiscussions()}
      {renderFooter()}
    </View>
  )
}

export default Discussions