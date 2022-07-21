import React from 'react'
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {
    View,
    Text
} from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants';


const TwoPointSlider = ({appTheme,textStyle, values, min , max, prefix, postfix, onValuesChange}) => {
  return (
    <MultiSlider
        values={values}
        sliderLength={SIZES.width - (SIZES.padding * 2) - 30}
        min= {min}
        max={max}
        step={1}
        markerOffsetY={15}
        selectedStyle={{
            height: 2,
            backgroundColor: COLORS.primary
        }}
        trackStyle={{
            height: 1,
            borderRadius: 10,
            backgroundColor: COLORS.gray30
        }}
        customMarker={(e)=> {
            return(
                <View
                style={{
                   height: 60,
                   width: 60,
                   alignItems: 'center',
                   justifyContent: 'center' 
                }}
                >
                    <View
                    style={{
                        height: 15,
                        width: 15,
                        borderRadius: 10,
                        borderWidth: 2,
                        borderColor: COLORS.primary,
                        backgroundColor:appTheme?.backgroundColor1
                    }}
                    />
                    <Text style={{marginTop: 5,color: COLORS.gray80, ...FONTS.body3,...textStyle}}>{prefix}{e.currentValue}{postfix}</Text>
                </View>
            )
        }}
        onValuesChange={(values)=> onValuesChange(values)}
    />
  )
}

export default TwoPointSlider